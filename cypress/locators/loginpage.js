export const loginPageLocators = {
    usernameField: {
      css: '[name="AuthenticationFG.USER_PRINCIPAL"]',
      xpath: 'name="AuthenticationFG.USER_PRINCIPAL'
    },
    passwordField: {
      css: '[name="AuthenticationFG\.ACCESS_CODE"]',
      xpath: '//input[@name="password"]'
    },
    loginButton: {
      css: '[id="VALIDATE_CREDENTIALS"]',
      xpath: '//button[@type="submit"]'
    },
    corporateID:{
      css :'id=["AuthenticationFG\.CUSTOM_CORP_ID"]',
      xpath : '#AuthenticationFG\.CUSTOM_CORP_ID'
    }
  };