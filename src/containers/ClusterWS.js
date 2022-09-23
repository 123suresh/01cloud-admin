import React, { Component } from 'react';
import { connect } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { getWorkflowLog, updateClusterPackageStatus, updateClusterWorkflowLog, updateClusterWorkflows } from '../pages/clusters/redux/actions';
import { sessionTokenSelector } from '../pages/login/redux/selectors';

class ClusterWS extends Component {
    constructor(props){
        super(props);
        this.state = {
            ws: null,
        }
    }

    componentDidMount() {
        if(this.props.clusterId > 0)
            this.socketConnection(this.props.clusterId);
    }

    componentWillUnmount(){
        if(this.state.ws !== null){
          this.state.ws.close(1000);
        }
    }

    /*UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps){
            if(nextProps.envId > 0)
            {
                if (this.props.envId === 0 || this.props.envId !== nextProps.envId)
                {
                    if(this.state.ws !== null){
                        this.state.ws.close(1000);
                    }
                    this.socketConnection(nextProps.envId);
                }
            }
        }
    }*/

    socketConnection = (id) => {
        if(this.state.ws !== null) return;
        let $this = this;
        const sessionToken = this.props.validSessionId;
        var ws = new W3CWebSocket(window?.config?.REACT_APP_SOCKET_IO_ENDPOINT + '?token='+ sessionToken + '&room=cluster-' + id);
        this.setState({
            ws
        })
        ws.onopen = () => {
            console.log('WebSocket Client Connected');
            this.setState({ ws: ws });
        };
        ws.onclose = e => {
            console.log('WebSocket connection closed');
            this.setState({ ws: null });
            if(e.code !== 1000)
                this.socketConnection(id);
        };
        ws.onerror = () => {
            console.log('WebSocket error');
            ws.close();
            this.setState({ ws: null })
        };
        ws.addEventListener('message', (response) => {
            if(response.type=== 'message'){
                const { data } = response;
                if(data)
                {
                    const _data = JSON.parse(data);
                    if(_data.Type === 'create-cluster-watcher')
                    {
                        $this.updateMainMessage(_data);
                        // this.setState({ 
                        //     workflowPhase : _data.Data && _data.Data.Workflow && _data.Data.Workflow.phase
                        // })
                    }
                    else if(_data.Type === 'cluster-apply' || _data.Type === 'cluster-destroy' || _data.Type === 'package-install' || _data.Type === 'package-uninstall')
                    {
                        $this.updateLogMessage(_data);
                        // let { logData } = this.state;
                        // logData = logData + "\n" + _data.Data;
                        // this.setState({ logData })
                    }
                    else if(_data.Type === 'package-status'){                        
                        const nsData= _data.Data
                        let newStatus = {
                            ...this.props.clusterPackageStatus,
                            [nsData.namespace]: {
                                ...nsData
                            }
                        }

                        // _dataKeys.forEach(_dk => {
                            
                        //     const packageNamespace = _dk
                        //     const status = {
                        //         namespace : packageNamespace,
                        //         status : _data.Data[_dk]
                        //     }
                        //     newStatus.push(status)
                            // const pac = this.props.clusterPackageStatus?.find(p => {
                            //     return p.namespace === packageNamespace
                            // })
                            // let newStatus = []
                            // if(pac){
                            //     newStatus = this.props.clusterPackageStatus.map(ps => {
                            //         if(ps.namespace === packageNamespace){
                            //             ps.status = data.Data[packageNamespace]
                            //         }
                            //         return ps
                            //     })                            
                            // }else{
                            //     newStatus = [...this.props.clusterPackageStatus, {
                            //         namespace: packageNamespace,
                            //         status: data.Data[packageNamespace]
                            //     }]
                            // }
                        // })
                        this.props.updateClusterPackageStatus(newStatus)  
                    }
                }
            }
        });
    }

    updateMainMessage = (_data) => {
        //console.log("ci-watcher")
        const _newWorkflow = {
            'Workflow': {
                'CreationTimestamp': {
                    'Time': _data.Data.Workflow.startedAt
                },
                'Name': _data.Name,
                'Status': {
                'FinishedAt': {
                    'Time': _data.Data.Workflow.finishedAt
                },
                'Phase': _data.Data.Workflow.phase,
                'StartedAt': {
                    'Time': _data.Data.Workflow.startedAt
                }
                }
            },
            'CIRequest': {},
            'LogSteps': _data.LogSteps,
            'Type': _data.Data.Type ? _data.Data.Type : 'cluster-watcher'
        }
        let _clusterWorkflows = [];
        if(this.props.clusterWorkflows){
            _clusterWorkflows = [ ...this.props.clusterWorkflows ];
        }
        const _workflowIndex = _clusterWorkflows.findIndex(x => x.Workflow.Name === _data.Name);
        if(_workflowIndex > -1)
        {
            _clusterWorkflows[_workflowIndex] = _newWorkflow;
        }
        else
        {
            _clusterWorkflows.unshift(_newWorkflow);
        }
        this.props.updateClusterWorkflows(_clusterWorkflows);
        if(_data.Data.Workflow.phase === 'Succeeded') {
            let $this = this;
            setTimeout( function () { $this.props.getWorkflowLog($this.props.clusterId, _data.Name); }, 2000)
        }
    }

    updateLogMessage = (_data) => {
        //console.log("ci-logs")
        let _clusterWorkflowLog = [ ...this.props.clusterWorkflowLog ];
        const _workflowLogIndex =  _clusterWorkflowLog.findIndex(x => x.Name === _data.WorkflowName);
        if(_workflowLogIndex > -1)
        {
            if(_clusterWorkflowLog[_workflowLogIndex] && _clusterWorkflowLog[_workflowLogIndex].Logs && _clusterWorkflowLog[_workflowLogIndex].Logs.length > 0)
            {
                _clusterWorkflowLog[_workflowLogIndex].Logs.push({
                    Log: _data.Data,
                    // Step:_data.Step ? _data.Step.Step : 0,
                    // Type:_data.Step ? _data.Step.Type : "",
                })
            }
        }
        else
        {
            let newWorkflowlog = {
                Name : _data.WorkflowName,
                Logs : [ {
                    Log: _data.Data,
                    // Step:_data.Step ? _data.Step.Step : 0,
                    // Type:_data.Step ? _data.Step.Type : "",
                } ],
                Type: _data.Type
            };
            _clusterWorkflowLog.push(newWorkflowlog);
        }
        this.props.updateClusterWorkflowLog(_clusterWorkflowLog);
    }

    getEmptyDiv = () =>{
       return(<div></div>)
    }

    render() {
        return (
            this.getEmptyDiv()
        )
    }
}

const mapStateToProps = state => ({
    clusterWorkflows: state.ClusterReducer.clusterWorkflows,
    clusterWorkflowLog: state.ClusterReducer.clusterWorkflowLog,
    clusterPackageStatus: state.ClusterReducer.clusterPackageStatus,
    validSessionId: sessionTokenSelector(state),
})

const mapDispatchtoProps = dispatch => {
    return {
        getWorkflowLog: (id, workflowName) => dispatch(getWorkflowLog(id, workflowName)),
        updateClusterWorkflowLog: (workflowLogs) => dispatch(updateClusterWorkflowLog(workflowLogs)),
        updateClusterWorkflows: (workflows) => dispatch(updateClusterWorkflows(workflows)),
        updateClusterPackageStatus: (status) => dispatch(updateClusterPackageStatus(status)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(ClusterWS)