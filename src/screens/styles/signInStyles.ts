import {StyleSheet} from "react-native";
import Theme from "../../themes/theme";

const SignInStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: Theme.secondary,
  },
  scrollContainer: {
    padding: 20,
  },
  scroll: {
    width: '100%',
  },
  frame: {
    backgroundColor: Theme.primary,
    padding: 15,
    paddingBottom: 25,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: "100%",
  },
  square: {
    width: 72,
    height: 72,
    backgroundColor: Theme.intenseBlue,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    paddingVertical: 10
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderRadius: 5,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: Theme.intenseBlue,
    width: "100%",
    height: 40,
    flexDirection: "row",
    columnGap: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 20,
  }
})
export default SignInStyles