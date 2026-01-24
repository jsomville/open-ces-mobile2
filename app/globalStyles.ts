import { StyleSheet } from "react-native";
import config from "./config";

const globalStyles = StyleSheet.create({
  loginContainer: {
    paddingTop: 160,
    marginTop: 30,
    backgroundColor: config.backgroundColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContainer: {
    padding: 20,
    marginTop: 25,
    backgroundColor: config.backgroundColor,
    flex: 1,
  },
  mainContainer: {
    padding: 20,
    marginTop: 0,
    backgroundColor: config.backgroundColor,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  footerContainer: {
    flex: 1,
    backgroundColor: 'darkGray',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  
  menuHeaderContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
    margin: 5,
    alignSelf: 'center',
    backgroundColor: config.secondaryColor,
    borderRadius: 20,
  },
  columnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    margin: 5,
  },
  rowContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    margin: 5,
  },
  rowContainerWbackground: {
    backgroundColor: config.secondaryColor,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    margin: 5,
  },
  transactionLogContainer: {
    width: '100%',
    flex: 1,
    marginTop: 10,
  },
  transactionLogHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    alignSelf: 'center'
  },
  actionButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    margin: 5,
    alignSelf: 'center'
  },
  buttonContainer: {
    alignItems: "center",
    padding: 5,
    alignSelf: 'center',
    justifyContent: "center",
  },
  leftColumn: {
    flex: 1,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  middleColumn: {
    flex: 2,
    alignItems: 'center',
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
    alignSelf: 'flex-start',
  },
  accountNumber: {
    fontSize: 18,
    marginBottom: 5,
    alignSelf: 'center'
  },
  balanceText: {
    fontSize: 24,
    marginBottom: 5,
  },
  login_image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 5,
  },
  menu_image: {
    width: 80,
    height: 80,
    marginBottom: 20,
    borderRadius: 5,
  },
  amount_unit_image: {
    width: 30,
    height: 30,
    margin: 5,
  },
  small_image: {
    width: 20,
    height: 20,
    margin: 5,
  },
  small_logo_image: {
    width: 30,
    height: 30,
    margin: 5,
  },
  button: {
    margin: 10,
    backgroundColor: config.primaryColor,
  },
  clearButton: {
    margin: 10,
  },
  roundedButton: {
    margin: 10,
    backgroundColor: config.primaryColor,
    borderRadius: 5,
    padding: 10,
    fontWeight: "bold",
  },
  tabButton: {
    margin: 10,
    backgroundColor: config.primaryColor,
    borderRadius: 5,
    padding: 10,
    fontWeight: "bold",
  },
  activeTabButton: {
    margin: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    fontWeight: "bold",
  },
  actionButton: {
    margin: 10,
    backgroundColor: config.primaryColor,
    borderRadius: 20,
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    marginLeft: 15,
    marginRight: 15,
  },
  info_label: {
    fontSize: 16,
    margin: 10,
    padding: 10,
  },
  eyeIcon: {
    justifyContent: "center",
    alignItems: "center",
    color: 'gray',
    padding: 2,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: 250,
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 16,
  },
  password_input: {
    borderWidth: 1,
    padding: 10,
    width: 210,
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 16,
  },
  amount_input_text: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    width: 100,
    borderRadius: 5,
    margin: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
  },
  amount_display_text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  hyperlink: {
    color: 'blue',
    textDecorationLine: 'underline',
    margin: 10,
  },
  picker: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedText: {
    marginTop: 16,
    fontSize: 16,
    color: '#333',
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  transactionDetails: {
    flex: 3,
  },
  transactionDate: {
    flex: 1,
    alignItems: "center", // Center-align day and month
  },
  transactionDay: {
    fontSize: 18,
    fontWeight: "bold",
  },
  transactionMonth: {
    fontSize: 14,
    color: 'gray',
  },
  transactionType: {
    flex: 2,
    fontSize: 14,
    textAlign: "left",
  },
  transactionDescription: {
    flex: 2,
    fontSize: 14,
    textAlign: "left",
  },
  transactionAmountContainer: {
    flex: 1,
    justifyContent: "center", // Vertically center the amount
    alignItems: "center", // Horizontally center the amount
    flexDirection: "row",
  },
  transactionAmount: {
    fontSize: 14,
  },
  smallButton: {
    backgroundColor: config.primaryColor,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    margin: 5
  },
  smallTestButton: {
    backgroundColor: 'red',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    margin: 5,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    marginLeft: -50,
    backgroundColor: config.primaryColor,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
});

export default globalStyles;