import React, { useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { getDiffBetweenDates } from '../../helpers/utils'
import { StepStatusIndicatorPopUp } from '../statusindicator/statusindicator'
import { AppConstants } from '../../constants/appconstants'
import Ansi from 'ansi-to-react';

import './cicdpopup.css';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  dialog: {
    //zIndex: 1302,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
      <MuiDialogTitle disableTypography className={ classes.root } { ...other }>
          <Typography variant="h6" color="primary">
              {children}
          </Typography>
          {onClose ? (
              <IconButton
                aria-label="close"
                className={ classes.closeButton }
                onClick={ onClose }
              >
                  <CloseIcon />
              </IconButton>
      ) : null}
      </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: '#424242',
  },
}))(MuiDialogContent);

// function StepStatusIndicator(props) {
//   let stepStatusIndicator = '';
//   switch(props.status) {
//       case 'Succeeded' :
//           stepStatusIndicator = <div className="circle"><CheckCircleIcon className="successStep"/></div>
//           break;
//       case 'Running' :
//           stepStatusIndicator = <div className="circle"><Brightness1Icon className="runningStep" /><div className="lds1-ring"><div></div><div></div><div></div><div></div></div></div>
//           break;
//       case 'Pending' :
//           stepStatusIndicator = <div className="circle"><Brightness1Icon className="pendingStep" /><div className="lds1-hour"><HourglassEmptyOutlinedIcon className="pendingStepIcon"/></div></div>
//           break;
//       case 'Failed' :
//           stepStatusIndicator = <div className="circle"><CancelIcon className="failedStep" /></div>
//           break;
//       default:
//           stepStatusIndicator = ''
//   }
//   return (
//       <span>
//           { stepStatusIndicator }
//       </span>
//   )
// }

export default function CustomizedDialogs(props) {
  const logEndRef = useRef(null);
  const [ dummydate, setDummydate ] = React.useState(null); 
  const [timer, setTimer] = React.useState(null); 
  
  const scrollToBottom = () => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [ props.logData ]);

  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      scrollToBottom();
    } else didMountRef.current = true;
  });

  useEffect(() => {
    if(props.openLogPopup)
    {
      let _timer = setInterval( () => setDummydate(Date.now()), 2000);
      setTimer(_timer);
    }
    else
    {
      setTimer(null);
    }
  },[ props.openLogPopup ])

  const getStatus = () => {
    const _phase = props.currentWorkFlow && props.currentWorkFlow.Workflow && props.currentWorkFlow.Workflow.Status && props.currentWorkFlow.Workflow.Status.Phase
    const step = props.currentWorkflowLogStep && props.currentWorkflowLogStep.Step;
    let statusIndicator = 'Pending'
    if(props.logData)
    {
        if(props.logData && props.logData.Logs && props.logData.Logs.length > 0)
        {
          const _currentStep = props.logData.Logs.find(x => x.Step === step);
          if(_currentStep)
          { 
            if(_phase === 'Running' || _phase === 'Failed' || _phase === 'Error')
            {
              const isNextStep = props.logData.Logs.find(x => x.Step === step + 1);
              if(isNextStep && isNextStep.Log)
              {
                  statusIndicator = 'Succeeded';
              }
              else
                  statusIndicator = props.currentWorkFlowIsStale ? 'Failed' : _phase
            }
            else
                statusIndicator = _phase
          }
        }
    }
    return statusIndicator;
  }

  const getStepStatus = () => {
      return <StepStatusIndicatorPopUp status={ getStatus() }/>;
  }

  const getStepElapsedTime = () => {
    let time = '';
    const step = props.currentWorkflowLogStep && props.currentWorkflowLogStep.Step;
    if (props.logData) {
      //const currentWorkflow = props.logData;
      if (props.logData.Logs && props.logData.Logs.length > 0) {
        if (props.source === '2') {
          const _status = getStatus();
          const endLineTime = props.logData.Logs[props.logData.Logs.length - 1].Log.split(' ')[0].trim();
          let finishTime = _status === AppConstants.WorkflowStatus.Running ? new Date().toUTCString() : endLineTime;
          time = getDiffBetweenDates(props.logData.Logs[0].Log.split(' ')[0].trim(), finishTime);
        }
        else {
          const _currentStep = props.logData.Logs.filter(x => x.Step === step);
          if(_currentStep && _currentStep.length > 0)
          {
            try {
              const _status = getStatus();
              const endLineTime = _currentStep[_currentStep.length - 1].Log.split(' ')[0].trim();
              let finishTime = _status === AppConstants.WorkflowStatus.Running ? new Date().toUTCString() : endLineTime;
              time = getDiffBetweenDates(_currentStep[0].Log.split(' ')[0].trim(), finishTime);
            }
            catch(e){
              console.log(e);
            }
          }
        }
      }
    }
    return time;
  }

  const getLogPopupHeader = () => {
    if(props.source === '2'){
      return (props.logData && props.logData.Type) + ' log'
    }
    else{
      return (props.currentWorkflowLogStep && props.currentWorkflowLogStep.Type) + ' log' 
    }
  }

  return (
      <div data-test="main-container">
          {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                logs
            </Button> */}
          <span style={{ display: "none" }}> {dummydate} { timer }</span>
          <Dialog
            aria-labelledby="customized-dialog-title"
            open={ props.openLogPopup }
            maxWidth="lg"
            className="modalZindex"
          >
              <DialogTitle
                id="customized-dialog-title"
                onClose={ () => props.handleCloseLogPopup() }
              >
                  <Grid>
                      <Grid container spacing={ 2 }>
                          <Grid item>{getStepStatus()}</Grid>
                          <Grid item data-test="build-header">
                              {getLogPopupHeader()}
                          </Grid>
                          <Grid item data-test="build-timer"> - { getStepElapsedTime() }</Grid>
                      </Grid>
                  </Grid>
              </DialogTitle>
              <DialogContent>
                  <Typography gutterBottom className="logstxt">
                      <div className="logs-container">
                          {props.logData &&
                props.logData.Logs &&
                  props.logData.Logs.length > 0 &&
                      [ ...props.logData.Logs ].reverse().map((log, ind) => {
                        return (
                            <div key={ ind } data-test="log-div">
                                {
                              (props.source === '2' || (props.currentWorkflowLogStep && log.Step === props.currentWorkflowLogStep.Step)) && 
                              <div className="inner">
                                  <span className="cicdPre">
                                      <Ansi>
                                          { log.Log.trim() }
                                      </Ansi>
                                  </span>
                              </div>
                            }
                            </div>
                        );
                      })
                }
                      </div>
                  </Typography>
                  {/* <div ref={logEndRef}></div> */}
              </DialogContent>
          </Dialog>
      </div>
  );
}
