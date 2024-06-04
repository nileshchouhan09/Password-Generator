import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Formik} from 'formik';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 character')
    .max(16, 'Should be max of 16 character')
    .required('Length is required'),
});
const App = () => {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setisPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumber] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePassword = (passwordLength: number) => {
    let characterList = '';

    const uppercaseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChar = 'abcdefghijklmnopqrstuvwxyz';
    const digit = '1234567890';
    const specialCharacters = '!@#$%^&*()_+=-';

    if (upperCase) {
      characterList += uppercaseChar;
    }
    if (lowerCase) {
      characterList += lowercaseChar;
    }
    if (numbers) {
      characterList += digit;
    }
    if (symbols) {
      characterList += specialCharacters;
    }

    const PasswordResult = createPassword(characterList, passwordLength);

    setPassword(PasswordResult);
    setisPassGenerated(true);
  };
  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);

      result += characters.charAt(characterIndex);
    }
    return result;
  };
  const resetPasswordState = () => {
    setPassword('');
    setisPassGenerated(false);
    setUpperCase(false);
    setLowerCase(false);
    setNumber(false);
    setSymbols(false);
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Pasword Generator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={passwordSchema}
            onSubmit={values => generatePassword(+values.passwordLength)}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleReset,
              handleChange,
              handleSubmit,
            }) => (
              <>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text style={styles.heading}>Password Length</Text>
                  {touched.passwordLength && errors.passwordLength && (
                    <Text style={styles.errorText}>
                      {errors.passwordLength}
                    </Text>
                  )}
                  </View>
                  
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="EX 6"
                      keyboardType="numeric"
                    />

                  </View>
                

                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>
                      Include Uppercase letters
                    </Text>
                    <BouncyCheckbox
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                      fillColor="#00b03b"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>
                      Include Lowercase letters
                    </Text>
                    <BouncyCheckbox
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor="#00b03b"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include numbers </Text>
                    <BouncyCheckbox
                      isChecked={numbers}
                      onPress={() => setNumber(!numbers)}
                      fillColor="#00b03b"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>
                      Include special characters{' '}
                    </Text>
                    <BouncyCheckbox
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="#00b03b"
                    />
                  </View>

                  <View style={styles.formActions}>
                    <TouchableOpacity
                      style={styles.primaryBtn}
                      disabled={!isValid}
                      onPress={()=>handleSubmit()}>
                      <Text style={styles.text}>Generate Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.secondaryBtnText}
                      onPress={() => {
                        handleReset();
                        resetPasswordState();
                      }}>
                      <Text style={styles.text}>Reset</Text>
                    </TouchableOpacity>
                  </View>
              </>
               
            )}
          </Formik>
        </View>

          
        {isPassGenerated && (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  heading: {
    fontSize: 15,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
  inputStyle: {
    padding: 9,
    width: '30%',
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 16,
    borderColor: '#16213e',
  },
  formActions: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  primaryBtn: {
    width: 150,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#16213e',
  },
  text: {
    color: '#FFF',
  },
  secondaryBtnText: {
    alignItems: 'center',
    width: 150,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#00b03b',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  subTitle: {fontSize: 26, fontWeight: '600', marginBottom: 2},
  description: {color: '#758283', marginBottom: 8},
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
});
