<CustomTextInput
boxWidth={'100%'}
placeholder={'confirmPassword'}
// label={'Enter your userEmail id'}
labelStyle={{ fontWeight: '700', }}
name='userconfirmPassword'
value={values.confirmPassword}
containerStyle={{ elevation: 10 }}
// bgColor='#e1f3f8'
// bgColor="#B1B1B0"
onChangeText={(e) => {
  handleChange("confirmPassword")(e); seterrorFormAPI();
  // setShow({ ...setShow, confirmPassword: false });
}}
// onChangeText={(e) => { const eToLowerCaseText = e.toLowerCase(); handleChange("confirmPassword")(eToLowerCaseText); seterrorFormAPI(); }}
onBlur={handleBlur("confirmPassword")}
rightIcon={<Pressable onPress={() => setShow({ ...setShow, confirmPassword: !show?.confirmPassword })}>
  {!show?.confirmPassword ? (
    <Entypo name="eye-with-line" size={20} color="black" />) : (
    <Entypo name="eye" size={20} color="black" />)
  }
</Pressable>
}
leftIcon={<Image source={require('../../assets/Images/Icons/lock.png')} style={{ width: 24, height: 24 }} />}
secure={!show?.confirmPassword}
validate={handleBlur("confirmPassword")}
outlined
borderColor={`${(errors.confirmPassword && touched.confirmPassword) || (errorFormAPI && errorFormAPI.confirmPassword) ? "red" : "#ccc"}`}
// errorMessage={`${(errors.confirmPassword && touched.confirmPassword) ? `${errors.confirmPassword}` : (errorFormAPI && errorFormAPI.confirmPasswordForm) ? `${errorFormAPI.confirmPasswordForm}` : ``}`}
errorMessage={`${(errorFormAPI && errorFormAPI.confirmPasswordForm) ? `${errorFormAPI.confirmPasswordForm}` : ``}`}
// errorColor='magenta'
/>