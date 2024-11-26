import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be at least 4 characters')
    .max(16, 'Should be at most 16 characters')
    .required('Length is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePassword = (passwordLength) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (uppercase) characterList += upperCaseChars;
    if (lowercase) characterList += lowerCaseChars;
    if (numbers) characterList += numberChars;
    if (symbols) characterList += symbolChars;

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (characters, passwordLength) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowercase(true);
    setUppercase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView 
      keyboardShouldPersistTaps="handled" 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Generate Password</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={(values) => generatePassword(+values.passwordLength)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <>
                {isPassGenerated && (
                  <View style={styles.passwordCard}>
                    <Text style={styles.generatedPasswordLabel}>Your Password</Text>
                    <Text style={styles.password}>{password}</Text>
                  </View>
                )}

                <View style={styles.card}>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Password Length</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="8-16 characters"
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      onBlur={handleBlur('passwordLength')}
                      keyboardType="numeric"
                      placeholderTextColor="#A3A3A3"
                    />
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>

                  <View style={styles.optionsContainer}>
                    <Text style={styles.sectionTitle}>Password Options</Text>
                    
                    <View style={styles.optionItem}>
                      <Text style={styles.optionText}>Include Lowercase</Text>
                      <BouncyCheckbox
                        isChecked={lowercase}
                        size={24}
                        fillColor="#007AFF"
                        iconStyle={styles.checkbox}
                        onPress={() => setLowercase(!lowercase)}
                        disableText
                      />
                    </View>

                    <View style={styles.optionItem}>
                      <Text style={styles.optionText}>Include Uppercase</Text>
                      <BouncyCheckbox
                        isChecked={uppercase}
                        size={24}
                        fillColor="#007AFF" 
                        iconStyle={styles.checkbox}
                        onPress={() => setUppercase(!uppercase)}
                        disableText
                      />
                    </View>

                    <View style={styles.optionItem}>
                      <Text style={styles.optionText}>Include Numbers</Text>
                      <BouncyCheckbox
                        isChecked={numbers}
                        size={24}
                        fillColor="#007AFF"
                        iconStyle={styles.checkbox}
                        onPress={() => setNumbers(!numbers)}
                        disableText
                      />
                    </View>

                    <View style={styles.optionItem}>
                      <Text style={styles.optionText}>Include Symbols</Text>
                      <BouncyCheckbox
                        isChecked={symbols}
                        size={24}
                        fillColor="#007AFF"
                        iconStyle={styles.checkbox}
                        onPress={() => setSymbols(!symbols)}
                        disableText
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.generateButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.generateButtonText}>Generate Password</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.resetButton}
                    onPress={resetPasswordState}
                  >
                    <Text style={styles.resetButtonText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  formContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 24,
    marginTop: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  passwordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  generatedPasswordLabel: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  password: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    padding: 12,
    fontSize: 17,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    fontSize: 13,
    color: '#FF3B30',
    marginTop: 4,
  },
  optionsContainer: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 17,
    color: '#000000',
  },
  checkbox: {
    borderColor: '#007AFF',
    borderRadius: 4,
  },
  buttonContainer: {
    gap: 12,
    marginTop: 24,
  },
  generateButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  resetButtonText: {
    color: '#007AFF',
    fontSize: 17,
    fontWeight: '600',
  },
});