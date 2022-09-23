import { Divider, Typography, Grid, Chip } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CloseIcon from '@material-ui/icons/Close';
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import ConfirmActionPopup from "../../components/confirmactionpopup/ConfirmActionPopup";
import CustomButton from "../../components/custombutton/CustomButton";
import { updateBreadcrumb } from "../project/redux/actions";
import AddInvitation from "./AddInvitation";
import { approveInvitation, fetchInvitationList } from "./redux/actions";

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.background.default,
    color: "grey",
    fontWeight: 500,
  },
  body: {
    color: "#555",
    fontSize: 14,
  },
}))(TableCell);

export const StyledTableRow = withStyles(() => ({
  root: {},
}))(TableRow);

export class Invitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isApprovePopupOpened: false,
      selectedInviteId: 0,
      isCreateInvitePopupOpen: false,
      currentView: 1
    };
  }

  componentDidMount() {
    this.props.fetchInvitationList();
    const breadcrumbData = [{ name: "Invitations", path: "/invitations" }];
    this.props.updateBreadcrumb(breadcrumbData);
  }

    handleInvite = () => {
        this.setState({
            isCreateInvitePopupOpen: true
          })
    }

    handleInviteCancel = () => {
        this.setState({
            isCreateInvitePopupOpen: false
        })
    }
    
    handleApprove = (id) => {
        this.setState({ 
            isApprovePopupOpened: true,
            selectedInviteId: id
        })
    }

    approveAgreeHandler = () => {
        this.props.approveInvitation(this.state.selectedInviteId);
        this.setState({
            selectedInviteId: 0,
            isApprovePopupOpened: false,
        });
    };

    approveDisagreeHandler = () => {
        this.setState({
            selectedInviteId: 0,
            isApprovePopupOpened: false,
        });
    };

    handleCreateEditSuccess = () => {
        this.setState({
            isCreateInvitePopupOpen: false
        })
    }

    handleListFilterClick = (type) => {
      this.setState({ currentView: type })
    }

  render() {
    const { invitationList, t } = this.props;
    const filteredList = invitationList && invitationList.length > 0 && invitationList.filter(x => (this.state.currentView === 1 && !x.email_sent) ||  (this.state.currentView === 2 && x.email_sent))
    return (
      <div data-test="main-container">
        <div className="listContainer">
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Typography color="textPrimary" variant="h5" data-test="invitation-header">
                {t("Invitations")}
              </Typography>
            </Grid>
            {
                invitationList && invitationList.length > 0 &&
                <>
                    <Grid item>
                        <Chip
                            data-test="pending-chip"
                            label="Pending"
                            clickable
                            color="primary"
                            onClick={ () => this.handleListFilterClick(1) }
                            variant= { this.state.currentView === 1 ? "default" : "outlined" }
                        />    
                    </Grid>
                    <Grid item>
                        <Chip
                            data-test="approved-chip"
                            label="Approved"
                            clickable
                            color="primary"
                            onClick={ () => this.handleListFilterClick(2) }
                            variant= { this.state.currentView === 2 ? "default" : "outlined" }
                        />    
                    </Grid>
                </>
            }
          </Grid>
          <CustomButton
            data-test="invite-button"
            label={t("Invite")}
            onClick={() => this.handleInvite()}
          />
        </div>
        <TableContainer component={Paper}>
          <Table data-test="invite-table">
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>User</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Company</StyledTableCell>
                <StyledTableCell>Role</StyledTableCell>
                <StyledTableCell>Purpose</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredList &&
                filteredList.map((invitation, ind) => (
                  <StyledTableRow key={invitation.id}>
                    <StyledTableCell>{ind + 1}</StyledTableCell>
                    <StyledTableCell data-test="name">{invitation.first_name + " " + invitation.last_name}</StyledTableCell>
                    <StyledTableCell data-test="email">
                      {invitation.email}
                    </StyledTableCell>
                    <StyledTableCell data-test="company">
                      {invitation.company}
                    </StyledTableCell>
                    <StyledTableCell data-test="designation">
                      {invitation.designation}
                    </StyledTableCell>
                    <StyledTableCell data-test="remarks">
                      {invitation.remarks}
                    </StyledTableCell>
                    <StyledTableCell>
                      {invitation.email_sent ? (
                        <p>
                          <span className="activestatus" data-test="approved"></span> Approved
                        </p>
                      ) : (
                        <CustomButton
                            data-test="approve-button"
                            label={t("Approve")}
                            onClick={() => this.handleApprove(invitation.id)}
                        />
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
          {
              invitationList && invitationList.length === 0 && 
              <div className="alignCenter" data-test="no-invitation"> <p> No Invitations </p> </div>
            }
            {
              filteredList && filteredList.length === 0 && 
              <>{ this.state.currentView === 1 ? <div className="alignCenter"> <p data-test="no-pending"> No Pending Invitations </p> </div> : <div className="alignCenter"> <p data-test="no-approved"> No Approved Invitations </p> </div>}</>
            }
        </TableContainer>
        <ConfirmActionPopup
            data-test="approve-popup"
            open={this.state.isApprovePopupOpened}
            handleAgree={() => this.approveAgreeHandler()}
            handleDisAgree={() => this.approveDisagreeHandler()}
            message={`Are you sure you want to appove the user?`}
            yesText="Yes"
            noText="No"
        />
        {
            this.state.isCreateInvitePopupOpen &&
            <Dialog
                data-test="dialog"
                open={this.state.isCreateInvitePopupOpen}
                keepMounted
                onClose={() => this.handleInviteCancel()}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                disableBackdropClick={true}
            >
                <DialogTitle id="alert-dialog-slide-title">
                    <Typography data-test="invite" className='dialogtitle'>Invite</Typography>
                    <IconButton data-test="close-button" aria-label="close" size="small" className='rightbtn' onClick={() => this.handleInviteCancel()}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent dividers>
                    <DialogContentText id="alert-dialog-slide-description">
                        <AddInvitation data-test="add-invitation" handleCreateEditSuccess={ this.handleCreateEditSuccess }/>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    invitationList: state.InvitationReducer.invitationList,
  };
};

const mapDispatchToProps = (dispatch) => ({
   fetchInvitationList: () => dispatch(fetchInvitationList()),
   approveInvitation: (id) => dispatch(approveInvitation(id)),
  updateBreadcrumb: (breadcrumbData) =>
    dispatch(updateBreadcrumb(breadcrumbData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Invitation));
