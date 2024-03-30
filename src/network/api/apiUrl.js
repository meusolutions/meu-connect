const ApiUrl = {
  GET_ADMIN_EVENTS: 'eventInfo/myEvent',
  LOG_IN: 'authenticate/authenticate',
  LOG_OUT: 'authenticate/logout',
  GET_USER_INFO: 'authenticate/getMyInfo',
  CHECK_DOMAIN: 'ezLogs/sayHello',
  LEAVES_DAY: 'myLeaveDays',
  REST_DAY: 'myLeaveRestDays',
  LEAVES_DAY_PENDING: 'myLeaveDayApprovalRequests/pending',
  LEAVES_DAY_APPROVE_REQ: 'myLeaveDayApprovalRequests',
  LEAVES_CATEGORY: 'leaveCategories',
  POST_LEAVES_DAY: 'leaveDays',
  DELETE_LEAVE_TICKET: 'leaveDays',
  GET_RANDOM_QUOTATION: 'getRandomQuotation',
  GET_BIRTHDAY_USER: 'users/statistics/birthday',
  POST_OT_VOUCHER: 'overtimes',
  GET_OT_VOUCHER: 'myOvertimes',
  DELETE_OT_VOUCHER: 'overtimes',
  GET_OT_VOUCHER_PENDING: 'myOvertimeApprovalRequests',
  GET_MY_DIRECT_MANAGER: 'myDirectManagers',
  GET_MY_MANAGERs: 'myManagers',
  GET_SALARY_USER: 'bankAccount',
  GET_SHEET_ID: 'payslip/mySaBooks',
  UPLOAD_IMAGE: 'attachments',
  CONFIRM_DAY: 'myAbsentRequests',
  ABSENT_CHART: 'myAbsentRequests/statistic',
  POST_CONFIRM_DAY: 'absentRequests',
  DELETE_RQ_CONFIRM_DAY: 'absentRequests',
  APPROVE_CONFIRM_DAY: 'myAbsentApprovalRequests',
  CHANGE_AVATAR: 'users',
  CHANGE_INFO: 'users',
  GET_INFO: 'users',
  MY_SA_SHEETS: 'payslip/mySaSheets',
  MY_PAY_SA_BOOK: 'payslip/mySaBooks',
  SA_BOOK: 'saBooks',
  SA_PAY_SLIP_SECTION: 'salaries/saSheets',
  SA_TABLE: 'saPayslipSections',
  GET_TIME_SHEET_PROJECT: 'hrTimesheetProjects',
  GET_LIST_IMAGE: 'attachments',
  POST_ADD_JOB: 'hrTimesheetWeeks',
  SUBMIT_ADD_JOB: '/hrTimesheetWeeks',
  MY_HR_TIME_SHEET: 'hrMyTimesheets',
  HR_TIME_SHEET_WEEK: 'hrTimesheetWeeks',
  TIME_SHEET_APPROVAL: 'hrTimesheets/myApprovalRequest',
  CONFIRM_TIME_SHEET_DETAIL: 'hrTimesheets',

  POST_COMMENT: 'comments',
  GET_COMMENT: 'comment',
  GET_TIME_KEEPING_BY_FILTER: 'myHrInOutLogs',
  GET_DATA_CHART_TIME_KEEPING: 'myInOutLogChart',

  GET_CONTACT_USER: 'userExtraContacts',
  CHANGE_CONTACT_USER: 'userExtraContacts',
  ADD_CONTACT_USER: 'userExtraContacts',
  POST_CONTACT_USER: 'userExtraContacts',

  GET_NOTIFICATION: 'notifications',

  GET_COMPANY_INFO: 'companyInfo',

  ADD_CONTACT_USER: 'users/addMyContactList',
  GET_CONTACT_LIST: 'users/myContactList',
  GET_BUSINESS_INFO: 'users/businessCard',

  POST_NOTIFICATION: 'notifications/SendNotificationByOneSignal',
};
export default ApiUrl;