<CustomTextInput3
                                            boxWidth={'100%'}
                                            placeholder={'Enter your current weight'}
                                            // label={'availableSlots'}
                                            name='availableSlots'
                                            value={values.availableSlots}
                                            // leftIcon={<FontAwesome name="envelope" size={20} color="black" />}
                                            // bgColor='#e1f3f8'
                                            // bgColor="#B1B1B0"

                                            onChangeText={(e) => {
                                                // Remove any non-numeric characters
                                                const numericValue = e.replace(/[^0-9]/g, '');
                                                // Update the state with the numeric value
                                                handleChange("availableSlots")(numericValue);
                                                seterrorFormAPI();
                                            }}
                                            onBlur={handleBlur("availableSlots")}
                                            validate={handleBlur("availableSlots")}
                                            keyboardType="numeric"
                                            outlined
                                            labelStyle={{ marginBottom: -2 }}
                                            borderColor={`${(errors.availableSlots && touched.availableSlots) || (errorFormAPI && errorFormAPI.availableSlotsForm) ? "red" : "#ccc"}`}
                                            errorMessavailableSlots={`${(errors.availableSlots && touched.availableSlots) ? `${errors.availableSlots}` : (errorFormAPI && errorFormAPI.availableSlotsForm) ? `${errorFormAPI.availableSlotsForm}` : ``}`}
                                        // errorColor='mavailableSlotsnta'
                                        />