import {StyleSheet} from "react-native";
import Theme from "../../../themes/theme";

const ModalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flexDirection: "column",
    alignItems: 'center',
    padding: 35,
    width: "80%",
    backgroundColor: Theme.primary,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  title: {
    fontWeight: "bold",
    fontSize: 18
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pickerContainer: {
    flexGrow: 1,
    borderRadius: 5,
    marginVertical: 20,
    marginLeft: 20,
    backgroundColor: "#ebeef0"
  },
})

export default ModalStyles;