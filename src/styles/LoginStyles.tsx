import { StyleSheet } from "react-native";

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F2",
  },

  content: {
    flex: 1,
    paddingHorizontal: 14,
  },

  header: {
    alignItems: "center",
    paddingTop: 45,
    paddingBottom: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#0E624F",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#37414A",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 13,
    color: "#66706E",
    textAlign: "center",
    lineHeight: 18,
  },

  loginCard: {
    backgroundColor: "#FAFBFA",
    borderRadius: 12,
    padding: 18,
    marginTop: 4,

    borderWidth: 1,
    borderColor: "#E1E4E1",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  inputSection: {
    marginBottom: 12,
  },

  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4C5756",
    marginBottom: 6,
  },

  passwordLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  forgotPassword: {
    fontSize: 10,
    fontWeight: "600",
    color: "#0E624F",
    marginBottom: 6,
  },

  inputContainer: {
    height: 42,
    borderWidth: 1,
    borderColor: "#C9D0CD",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    height: "100%",
    fontSize: 13,
    color: "#37414A",
    paddingVertical: 0,
  },

  eyeButton: {
    paddingLeft: 10,
    paddingVertical: 6,
  },

  keepSignedInRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 16,
  },

  checkbox: {
    width: 17,
    height: 17,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#C4CDCA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 7,
    backgroundColor: "#FFFFFF",
  },

  checkboxActive: {
    backgroundColor: "#0E624F",
    borderColor: "#0E624F",
  },

  keepSignedInText: {
    fontSize: 11,
    color: "#697270",
  },

  signInButton: {
    height: 42,
    borderRadius: 9,
    backgroundColor: "#0E624F",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#0E624F",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 3,
  },

  signInText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 17,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E1E4E1",
  },

  dividerText: {
    fontSize: 8,
    fontWeight: "700",
    color: "#697270",
    marginHorizontal: 10,
    letterSpacing: 0.4,
  },

  socialButtons: {
    flexDirection: "row",
    gap: 10,
  },

  socialButton: {
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderColor: "#C9D0CD",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9F8",
  },

  socialButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#37414A",
    marginLeft: 8,
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  registerText: {
    fontSize: 11,
    color: "#697270",
    marginRight: 6,
  },

  registerButton: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0E624F",
  },
});