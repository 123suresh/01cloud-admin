import React, { Component } from "react";
//import { withStyles } from "@material-ui/core/styles";
import {
  // TableCell,
  // TableRow,
  Typography,
} from "@material-ui/core";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "./redux/actions";
import paths from "../../constants/paths";
import DataTable from "../../components/muidatatable/DataTable";
import BackdropLoader from "../../components/loader/BackdropLoader";
import "./user.css";
import IconButton from "@material-ui/core/IconButton";
import { updateBreadcrumb} from "./redux/actions";
import { addUserDiscount, updateUserDiscount, getUserDiscount, clearDiscountData } from "./userinfo/redux/actions"
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddIcon from '@material-ui/icons/Add';
import UserDiscountPopUp from '../../components/userdiscountpopup/UserDiscountPopUp';

// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: theme.palette.background.default,
//     color: "grey",
//     fontWeight: 500,
//   },
//   body: {
//     color: "#555",
//     fontSize: 14,
//   },
// }))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//   root: {},
// }))(TableRow);

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDiscountData: null,
      userId: 0,
      openAddPopup: false,
      timer: null,
      page: 1,
      size: 20,
      search: "",
      sortColumn: "id",
      sortDirection: "desc",
      columns: [
        {
          name: "sn",
          label: "S.N.",
          options: {
            filter: false,
            sort: true,
          },
        },
        {
          name: "id",
          label: "ID",
          options: {
            filter: false,
            sort: false,
            display: false,
          },
        },
        {
          name: "name",
          label: "Name",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          name: "email",
          label: "Email",
          options: {
            filter: false,
            sort: true,
          },
        },
        {
          name: "company",
          label: "Company",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          name: "admin",
          label: "Admin",
          options: {
            filter: true,
            sort: false,
          },
        },
        {
          name: "active",
          label: "Active",
          options: {
            filter: false,
            sort: false,
          },
        },
        {
          name: "email_verified",
          label: "Email Verified",
          options: {
            filter: true,
            sort: false,
            filterOptions: ["Verified", "Not Verified"],
            customFilterListOptions: { render: (v) => `email_verified: ${v} ` },
          },
        },
        {
          name: "actions",
          label: "Actions",
          options: {
            filter: false,
            sort: false,
          },
        },
      ],
      data: [],
    };
  }

  getUsersList = (userList) => {
    return userList.map((user, ind) => {
      const userLink = (
        <>
          <Link
            to={paths.USER_INFO.replace(":userId", user.id)}
            className="userInfoLink"
          >
            <IconButton aria-label="edit">
              <VisibilityIcon />
            </IconButton>
          </Link>
          <IconButton onClick={() => this.openAddPopupHandler(user.id)} >
            <AddIcon />
          </IconButton>
        </>
      );
      const userName = user.first_name + " " + user.last_name;
      return {
        sn: ((this.state.page - 1) * this.state.size) + (ind + 1),
        name: userName,
        email: user.email,
        company: user.company,
        admin: user.is_admin ? "Admin" : "User",
        active:
          // <Typography className={user.active ? "activeClass" : "inactiveClass"}>
          // </Typography>
          user.active ? (
            <p>
              <span className="activestatus"></span> Active
            </p>
          ) : (
            <p>
              <span className="inactivestatus"></span> Inactive
            </p>
          ),
        email_verified:
          // <Typography
          //   className={user.email_verified ? "activeClass" : "inactiveClass"}
          // >
          // </Typography>
          user.email_verified ? "Verified" : "Not Verified",
        actions: userLink,
        id: user.id,
      };
    });
  };

  fetchUsersList = () => {
    this.props.fetchUsers(this.state.page, this.state.size, this.state.search, this.state.sortColumn, this.state.sortDirection);
  }

  componentDidMount() {
    this.fetchUsersList()
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    if (this.props !== newProps) {
      this.setState({
        data: this.getUsersList(newProps.userList)
      })
    }
    if (newProps.userList && newProps.userList.length > 0) {
      const breadcrumbData = [{ name: "Users ", path: `${paths.USERS}` }];
      this.props.updateBreadcrumb(breadcrumbData);
    }
  };

  handleSearch = (query) => {
    this.setState({
      search: query,
      page: 1
    }, () => {
      if (this.state.timer) {
        clearTimeout(this.state.timer)
      }
      this.setState({
        timer: setTimeout(() => {
          this.fetchUsersList()
        }, 1000)
      })

    })
  }

  handlePageChange = (currentPage) => {
    let nextPage = currentPage + 1
    this.setState({
      page: nextPage,
    }, () => {
      this.fetchUsersList()
    })
  }

  handleSizeChange = (newSize) => {
    this.setState({
      size: newSize,
      page: 1,
    }, () => {
      this.fetchUsersList()
    })
  }

  // handleRowClick = (rowData) => {
  //   const ID = rowData[1];
  //   this.props.history.push(paths.USER_INFO.replace(":userId", ID));
  // }
  handleSortChange = (changedColumn, direction) => {
    //let col = changedColumn === "name" ? "first_name" : changedColumn
    this.setState({
      sortColumn: changedColumn,
      sortDirection: direction === "ascending" ? "asc" : "desc"
    }, () => {
      this.fetchUsersList()
    })

  }

  openAddPopupHandler = (id) => {
    this.props.getUserDiscount(id)
    this.setState({
      userId: id,
    }, () => {
        this.setState({
          openAddPopup: true
        })
      })
  }

  handleCancelPopUp = () => {
    this.setState({
      openAddPopup: false
    })
    this.props.clearDiscountData()
  }

  render() {
    const { t } = this.props;
    return (
      <div data-test="main-container">
        <Typography color="textPrimary" variant="h5" className="m-b-20" data-test="user-header">
          {t("Users")}
        </Typography>

        <DataTable
          data-test="data-table"
          columns={this.state.columns}
          data={this.state.data}
          options={{
            filter: false,
            selectableRows: "none",
            jumpToPage: true,
            searchOpen: true,
            count: this.props.userCount,
            searchPlaceholder: "Search with Name",
            rowsPerPage: this.state.size,
            rowsPerPageOptions: [10, 15, 20, 30],
            serverSide: true,
            download: false,
            print: false,
            textLabels: {
              pagination: {
                jumpToPage: "Go to Page"
              }
            },
            //onRowClick: this.handleRowClick,
            onChangeRowsPerPage: this.handleSizeChange,
            // onTableChange: this.handleTableChange,
            onSearchChange: this.handleSearch,
            onChangePage: this.handlePageChange,
            onColumnSortChange: this.handleSortChange,
          }}
        />
          {this.props?.userDiscount && (
                <UserDiscountPopUp 
                    data-test="user-discount"
                    userId={this.state.userId}
                    clearDiscountData={this.props.clearDiscountData}
                    userDiscountData={this.props?.userDiscount}
                    openAddPopup={this.state.openAddPopup}
                    handleCancelPopUp={this.handleCancelPopUp}
                    updateDiscount = {(id, jsonBody) => this.props.updateUserDiscount(id,jsonBody)}
                />
            )}
        {this.props.fetchingUser && <BackdropLoader message={t('User.Users.fetchingUser')} data-test="fetching-user"/>}
        {this.props.addingUserDiscount && <BackdropLoader message={t('User.Users.addingUserDiscount')} data-test="adding-discount"/>}
        {this.props.updatingUserDiscount && <BackdropLoader message={t('User.Users.updatingUserDiscount')} data-test="updating-discount" />}
        {this.props.fetchingUserDiscount && <BackdropLoader message={t('User.Users.fetchingUserDiscount')} data-test="fetching-discount" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.UserReducer.userList,
    userCount: state.UserReducer.userCount,
    fetchingUser: state.UserReducer.fetchingUser,
    addingUserDiscount: state.UserInfoReducer.addingUserDiscount,
    updatingUserDiscount: state.UserInfoReducer.updatingUserDiscount,
    userDiscount: state.UserInfoReducer.userDiscount,
    fetchingUserDiscount: state.UserInfoReducer.fetchingUserDiscount
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: (page, size, search, sortColumn, sortDirection) => dispatch(fetchUsers(page, size, search, sortColumn, sortDirection)),
  updateBreadcrumb: (breadcrumbData) => dispatch(updateBreadcrumb(breadcrumbData)),
  addUserDiscount: (jsonBody) => dispatch(addUserDiscount(jsonBody)),
  updateUserDiscount: (id, jsonBody) => dispatch(updateUserDiscount(id,jsonBody)),
  getUserDiscount: (id) => dispatch(getUserDiscount(id)),
  clearDiscountData: () => dispatch(clearDiscountData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(User));
