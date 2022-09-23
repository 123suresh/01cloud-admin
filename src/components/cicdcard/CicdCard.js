import React, { useEffect } from 'react';
import { Link, Grid, Card, CardContent, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { connect } from 'react-redux'
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import RefreshIcon from '@material-ui/icons/Refresh';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { getDiffDays, getDiffBetweenDates, getDiffInHours } from '../../helpers/utils'
import HourglassEmptyOutlinedIcon from '@material-ui/icons/HourglassEmptyOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import './cicdcard.css';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import CicdLogSkeleton from '../skeletons/CicdLogSkeleton'
import { AppConstants } from '../../constants/appconstants'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({

    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    svgicon: {
        fontSize: 14,
        color: '#357dfd',
        marginRight: 5,
    },

}));

function StatusIndicator(props) {
    let statusIndicator = <HourglassEmptyOutlinedIcon/>;
    if(props.Status) {
        switch(props.Status.Phase) {
            case 'Succeeded' :
                statusIndicator = <CheckIcon className="sucessIcon" />
                break;
            case 'Running' :
                if(props.isStale)
                {
                    statusIndicator = <ClearOutlinedIcon color="error"/>
                }   
                else
                { 
                    statusIndicator = <div className="lds-ring running"><div></div><div></div><div></div><div></div></div>
                }
                break;
            case 'Pending' :
                statusIndicator = <HourglassEmptyOutlinedIcon/>
                break;
            case 'Failed' :
                statusIndicator = <ClearOutlinedIcon color="error"/>
                break;
            case 'Error' : 
                statusIndicator = <ClearOutlinedIcon color="error"/>
                break;
            case "":
                statusIndicator = <HourglassEmptyOutlinedIcon/>
                break
            default:
                if(props.Status.FinishedAt && props.Status.FinishedAt.Time && props.Status.Phase !== "")
                    statusIndicator = <ClearOutlinedIcon color="error"/>
                else
                    statusIndicator = <HourglassEmptyOutlinedIcon/>
        }
    }
    return (
        <div>
            { statusIndicator }
        </div>
    )
  }

  function StepStatusIndicator(props) {
    let stepStatusIndicator = '';
    switch(props.status) {
        case 'Succeeded' :
            stepStatusIndicator = <div className="circle"><CheckCircleIcon className="successStep"/></div>
            // stepStatusIndicator = <div className="running-circle orange"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
            break;
        case 'Running' :
            // stepStatusIndicator = <div className="running-circle orange"><div class="lds1-ring"><div></div><div></div><div></div><div></div></div></div>
            stepStatusIndicator = <div className="circle"><Brightness1Icon className="runningStep" /><div className="lds1-ring"><div></div><div></div><div></div><div></div></div></div>
            break;
        case 'Pending' :
            stepStatusIndicator = <div className="circle"><Brightness1Icon className="pendingStep" /><div className="lds1-hour"><HourglassEmptyOutlinedIcon className="pendingStepIcon"/></div></div>
            break;
        case 'Failed' :
            stepStatusIndicator = <div className="circle"><CancelIcon className="failedStep" /></div>
            break;
        default:
            stepStatusIndicator = ''
    }
    return (
        <div>
            { stepStatusIndicator }
        </div>
    )
  }

  function StepComponent(props) {
    const { Workflow, logStep, isStale } = props;

    const getStatus = () => {
        const _phase = Workflow && Workflow.Status && Workflow.Status.Phase
        let statusIndicator = 'Pending'
        if(props.logData)
        {
            if(props.logData && props.logData.Logs && props.logData.Logs.length > 0)
            {
                if (props.source === "1") {
                    const _currentStep = props.logData.Logs.find(x => x.Step === logStep.Step);
                    if(_currentStep)
                    {
                        if(_phase === 'Running' || _phase === 'Failed' || _phase === 'Error')
                        {
                            const isNextStep = props.logData.Logs.find(x => x.Step === logStep.Step + 1);
                            if(isNextStep && isNextStep.Log)
                            {
                                statusIndicator = 'Succeeded';
                            }
                            else
                                statusIndicator = isStale ? 'Failed' : _phase
                        }
                        else
                            statusIndicator = _phase
                    }
                }
                else if (props.source === "2") { 
                    statusIndicator = isStale ? 'Failed' : _phase
                }
            }
        }
        return statusIndicator;
    }
      
    const getStepStatus = () => {
        return <StepStatusIndicator status={ getStatus() }/>;
    }

    const showStepLogOption = () => {
        let isShow = false;
        if(props.logData)
        {
            if(props.logData && props.logData.Logs && props.logData.Logs.length > 0)
            {
                if (props.source === "1") {
                    const _currentStep = props.logData.Logs.find(x => x.Step === logStep.Step);
                    if(_currentStep && _currentStep.Log) isShow = true;
                }
                else if (props.source === "2") { 
                    isShow = true;
                }
            }
        }
        return isShow;
    }

    const getStepElapsedTime = () => {
        let time = '';
        if(props.logData)
        {
            if(props.logData && props.logData.Logs && props.logData.Logs.length > 0)
            {
                if (props.source === "1") {
                    const _currentStep = props.logData.Logs.filter(x => x.Step === logStep.Step);
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
                else if (props.source === "2") {
                    const _status = getStatus();
                    const endLineTime = props.logData.Logs[props.logData.Logs.length - 1].Log.split(' ')[0].trim();
                    let finishTime = _status === AppConstants.WorkflowStatus.Running ? new Date().toUTCString() : endLineTime;
                    time = getDiffBetweenDates(props.logData.Logs[0].Log.split(' ')[0].trim(), finishTime);
                }
            }
        }
        return time;
    }

    const handleShowLog = () => {
        props.handleShowLog(Workflow.Name, isStale , logStep);
      }
      
      const getTitle = () => {
          let title = "";
          if (props.source === "1") {
              title = logStep && logStep.Type
          }
          else if (props.source === "2") {
              title = props.logData && props.logData.Type
          }
          return title;
      }

    return (
        <div className="step" key={ logStep && logStep.Step }>
            <div className="iconSizeWidth">
                { getStepStatus()}
            </div>
            <div>
                <div className="title">{getTitle()}</div>
                <div className="stepsRight">
                    {
                        showStepLogOption() &&
                        <>
                            <span className="time"> { getStepElapsedTime() } </span>
                            <span><DescriptionOutlinedIcon className="logsIcon" onClick={ () => handleShowLog() }/></span>
                        </>
                    }
                </div>
                <Divider className="m-t-10" />
            </div>
        </div>
    )
  }
  
export const CICDCard = (props) => {
    const classes = useStyles();
    const [t] = useTranslation()
    const [ expanded, setExpanded ] = React.useState(false);
    // const [ isShowFullCommitId, setIsShowFullCommitId ] = React.useState(false);
    const [ timer, setTimer ] = React.useState(null);
    const [ dummydate, setDummydate ] = React.useState(null);  
    const { CIRequest, Workflow, LogSteps } = props.data
    const gitLink = CIRequest && CIRequest.RepositoryImage ? CIRequest.GitUrl.substring(0, CIRequest.GitUrl.length - 4) + '/commit/' + CIRequest.RepositoryImage.Tag : ''
    const isStale = Workflow && Workflow.Status && Workflow.Status.Phase === 'Running' ? 
                                 (getDiffInHours(Workflow.Status.StartedAt && Workflow.Status.StartedAt.Time) > 1 ? true : false) : false
    useEffect(() => {
        if(timer === null && (Workflow.Status.Phase === 'Pending' || Workflow.Status.Phase === 'Running'))
        {
            let _timer = setInterval( () => setDummydate(Date.now()), 2000);
            setTimer(_timer);
        }
        if (timer !== null && (Workflow.Status.Phase === 'Succeeded' || Workflow.Status.Phase === 'Failed' || Workflow.Status.Phase === 'Error'))
        {
            setTimer(null);
        }
    }, [ Workflow ]);
    
    const handleExpandClick = (workflowName, isFetchLog) => {
        if(!expanded && isFetchLog) {
            props.fetchWorkflowLogs(workflowName);
        }
        else if(!isFetchLog){
            if(timer === null)
            {
                let _timer = setInterval( () => setDummydate(Date.now()), 2000);
                setTimer(_timer);
            }
        }
        setExpanded(!expanded);
    };

    const handleReRun = (workflowName) => {
        props.handleReRun(workflowName);
    }

    const handleStop = (workflowName) => {
        props.handleStop(workflowName);
    }

    const handleShowLog = (workflowName, isWorkFlowStale, logStep) => {
        props.handleShowLog(workflowName, isWorkFlowStale, logStep);
    }

    // const showFullCommitId = () => {
    //     setIsShowFullCommitId(true);
    // }

    // const hideFullCommitId = () => {
    //     setIsShowFullCommitId(false);
    // }

    const getWorkflowFinishedTime = () => {
        let finishTime = new Date();
        const status = Workflow && Workflow.Status;
        
        if(status.Phase !== 'Running' && status.FinishedAt)
           finishTime = status.FinishedAt.Time;
        
        return finishTime;
    }

    // const getStepStatusPopUp = (step) => {
    //     const _phase = Workflow && Workflow.Status && Workflow.Status.Phase
    //     let statusIndicator = "Pending"
    //     if(props.logData)
    //     {
    //         if(props.logData && props.logData.Logs && props.logData.Logs.length > 0)
    //         {
    //             const _currentStep = props.logData.Logs.find(x => x.Step == step);
    //             if(_currentStep)
    //             { 
    //                 if(_currentStep.Status)
    //                 {
    //                     statusIndicator = _phase == "Succeeded" ? "Succeeded" : _currentStep.Status;
    //                 }
    //                 else
    //                 {
    //                     if(_phase == "Running")
    //                         statusIndicator = "Pending"
    //                     else
    //                         statusIndicator = _phase
    //                 }
    //             }
    //         }
    //     }
    //     return <StepStatusIndicatorPopUp status={ statusIndicator }/>;
        
    // }

    // const getStepStatus = (logStep) => {
        
    //     if(props.logData && props.logData.Logs)
    //     {
    //         const totalSteps = props.logData.Logs.length;
    //         const currentStep = props.logData.Logs.find(x => x.Step == logStep);
    //         const prevStep = props.logData.Logs.find(x => x.Step == logStep - 1);
    //         const nextStep = props.logData.Logs.find(x => x.Step == logStep + 1);
    //         if(logStep == 1)
    //         {
    //             //first step
    //         }
    //         else if(logStep == totalSteps)
    //         {
    //             //last step
    //             if(Workflow && Workflow.Status && (Workflow.Status.Phase == "Succeeded" || Workflow.Status.Phase == "Failed"))
    //             {
    //                 return <StepStatusIndicator status={ Workflow.Status.Phase }/>
    //             }
    //             else {
    //             }
    //         }
    //         else{
    //             //intermediate step
    //         }

    //         if(nextStep && nextStep.Log)
    //         {
    //             return <StepStatusIndicator status="Succeeded" />
    //         }
    //         else {
                
    //             if(currentStep && currentStep.Log)
    //             {

    //             }
    //             else
    //             {

    //             }
    //         }
            
    //         // if(props.logData.Logs.length == logStep)
    //         // {
    //         //     if(Workflow && Workflow.Status && (Workflow.Status.Phase == "Succeeded" || Workflow.Status.Phase == "Failed"))
    //         //     {
    //         //         return <StepStatusIndicator status={ Workflow.Status.Phase }/>
    //         //     }
    //         //     else {
    //         //     }
    //         // }
    //         // else
    //         // {

    //         // }
    //     }
    // }

    return (
        <div>
            {
                CIRequest &&
                <Card className="m-b-20" data-test="main-container">
                    <CardContent>
                        <span style={{ display: "none" }}> { dummydate } </span>
                        <Grid>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item md={ 1 } >
                                    <StatusIndicator Status={ Workflow && Workflow.Status } isStale={ isStale }/>
                                </Grid>

                                <Grid item md={ 10 }>
                                    <Grid>
                                        <Grid container alignItems="center" >
                                            <Grid item md={ 10 }>
                                                <Grid>
                                                    <Grid container>
                                                        <Grid item md={ 12 } xs={ 12 }>
                                                            {
                                                                props.source === '1' &&
                                                                <>
                                                                    {t('Ci')}{ (props.dataCount - props.index) } {t('Commit')}&nbsp;
                                                                    {
                                                                        <Link href={ gitLink } target="_blank" rel="noreferrer" underline='always' data-test="repo-tag">
                                                                            { CIRequest.RepositoryImage && CIRequest.RepositoryImage.Tag.substring(0, 7) }
                                                                        </Link>
                                                                    }
                                                                </>
                                                            }
                                                            {
                                                                props.source === '2' && <>#{ (props.dataCount - props.index) }</>
                                                            }
                                                            
                                                        </Grid>

                                                        <Grid item md={ 12 } xs={ 12 }>
                                                            { props.source === '1' && <p className="commitmsg oneLine" title={ CIRequest.CommitMessage } data-test="commit-msg"> { CIRequest.CommitMessage }</p> }
                                                            { props.source === '2' && <p className="commitmsg oneLine" title={ props.data && props.data.Type }> { props.data && props.data.Type }</p> }
                                                        </Grid>

                                                        <Grid item md={ 12 }>
                                                            <Grid>
                                                                <Grid container>
                                                                    { 
                                                                        props.source === '1' &&
                                                                        <>
                                                                            <Grid item md={ 4 } xs={ 6 } className="header-details-grid">
                                                                                <PersonOutlineOutlinedIcon className={ classes.svgicon } />
                                                                                <span className="infoGrid" data-test="author-name">{ CIRequest.Author }</span>
                                                                            </Grid>
                                                                            <Grid item md={ 3 } xs={ 6 } className="header-details-grid">
                                                                                <AccountTreeOutlinedIcon className={ classes.svgicon } />
                                                                                <span className="infoGrid" data-test="branch-name">{ CIRequest.GitBranch }</span>
                                                                            </Grid>
                                                                        </>
                                                                    }
                                                                    {
                                                                        props.source === '2' &&
                                                                        <>
                                                                            <Grid item md={ 4 } xs={ 6 } className="header-details-grid">
                                                                                <SettingsOutlinedIcon className={ classes.svgicon } />
                                                                                <span className="infoGrid">{ props.clusterDetails && props.clusterDetails.cluster_version }</span>
                                                                            </Grid>
                                                                            <Grid item md={ 3 } xs={ 6 } className="header-details-grid">
                                                                                <PublicOutlinedIcon className={ classes.svgicon } />
                                                                                <span className="infoGrid">{ props.clusterDetails && props.clusterDetails.region }</span>
                                                                            </Grid>
                                                                        </>
                                                                    }
                                                                    <Grid item md={ 3 } xs={ 6 } className="header-details-grid">
                                                                        <DateRangeOutlinedIcon className={ classes.svgicon } />
                                                                        <span className="infoGrid" data-test="time-diff">{ getDiffDays(Workflow.CreationTimestamp.Time, true) }</span>
                                                                    </Grid>
                                                                    <Grid item md={ 2 } xs={ 6 } className="header-details-grid">
                                                                        <ScheduleOutlinedIcon className={ classes.svgicon } />
                                                                        <span className="infoGrid" data-test="started-time">{ !isStale ? getDiffBetweenDates(Workflow.Status.StartedAt.Time, getWorkflowFinishedTime()) : 'NA'}</span>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            {
                                                props.source === '1' &&
                                                <Grid item md={ 2 }>
                                                    {
                                                        props.index === 0 && Workflow && Workflow.Status && Workflow.Status.Phase === 'Failed' &&
                                                        <Button variant="outlined" onClick={ () => handleReRun(Workflow.Name) }
                                                          startIcon={ <RefreshIcon /> }
                                                          data-test="rerun-btn"
                                                        >
                                                            {t('ReRun')}
                                                        </Button>
                                                    }
                                                    {
                                                        Workflow && Workflow.Status && (Workflow.Status.Phase === 'Pending' || (Workflow.Status.Phase === 'Running' && !isStale)) &&
                                                        <Button variant="outlined" onClick={ () => handleStop(Workflow.Name) }
                                                          startIcon={ <StopRoundedIcon /> }
                                                          data-test="stop-btn"
                                                        >
                                                            {t('Stop')}
                                                        </Button>
                                                    }
                                                </Grid>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item md={ 1 } className="center stick-right">

                                    <IconButton
                                      className={ clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        }) }
                                      onClick={ () => handleExpandClick(Workflow.Name, Workflow.Status && (Workflow.Status.Phase === 'Pending' || (Workflow.Status.Phase === 'Running' && !isStale)) ? false : true) }
                                      aria-expanded={ expanded }
                                      aria-label="show more"
                                      data-test="expand-icon"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>

                    <Collapse in={ expanded } timeout="auto" unmountOnExit>
                        <Divider />
                        <CardContent>
                            {
                                props.source === '1' &&
                                <>
                                    {
                                    !props.logData && 
                                    [ 0,1,2 ].map(value => {
                                        return (
                                            <React.Fragment key={ value }>
                                                <CicdLogSkeleton data-test="cicd-skel" />
                                            </React.Fragment>
                                        )
                                    })
                                }
                                    {
                                    props.logData && (!props.logData.Logs || props.logData.Logs.length === 0) && Workflow && Workflow.Status && Workflow.Status.Message &&
                                    <div className="step">
                                        <span>{t('ErrorMessage')} </span>
                                        <div className="title failedStep" data-test="no-workflow-msg">{ Workflow.Status.Message }</div>
                                    </div>
                                }
                                    { 
                                    props.logData && props.logData.Logs && LogSteps && LogSteps.length > 0 && LogSteps.map((logStep, ind) => {
                                        return (
                                            <StepComponent 
                                                source={props.source}
                                                Workflow={ Workflow }
                                                isStale = { isStale }
                                                logStep = { logStep }
                                                logData = { props.logData }
                                                handleShowLog={handleShowLog}
                                                key={ ind }
                                                data-test="step-comp"
                                            />
                                        )
                                    })
                                }
                                </>
                            }
                            {
                                props.source === '2' &&
                                !LogSteps &&
                                // <div className="step">
                                //     <div className="iconSizeWidth">
                                //         <StepStatusIndicator status={ Workflow && Workflow.Status && Workflow.Status.Phase }/>
                                //     </div>
                                //     <div>
                                //         <div className="title">{ props.logData && props.logData.Type }</div>
                                //         <div className="stepsRight">
                                //             <span className="time"> { getDiffBetweenDates(Workflow.Status.StartedAt.Time, getWorkflowFinishedTime()) } </span>
                                //             <span><DescriptionOutlinedIcon className="logsIcon" onClick={ () => handleShowLog(Workflow.Name, isStale , null) }/></span>
                                //         </div>
                                //         <Divider className="m-t-10"/>
                                //     </div>
                                // </div>
                                <StepComponent
                                    source={ props.source }
                                    Workflow={Workflow}
                                    isStale={isStale}
                                    logStep={ null }
                                    logData={props.logData}
                                    handleShowLog={handleShowLog}
                                    key={0}
                                />
                            }
                            {/* <div class="step ">
                                <div>
                                    <div className="circle green"><CheckIcon className="successStep" /></div>
                                </div>
                                <div>
                                    <div className="title">Second Step</div>
                                </div>
                            </div>
                            <div class="step">
                                <div>
                                    <div className="circle orange"> <div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
                                </div>
                                <div>
                                    <div className="title">Third Step</div>
                                </div>
                            </div> */}

                        </CardContent>
                        
                    </Collapse>
                </Card>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        projectRole: state.ProjectReducer.projectRole
    }

}

export default connect(mapStateToProps, null)(CICDCard) 
