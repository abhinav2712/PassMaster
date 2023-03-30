import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,TextInput } from 'react-native'
import React, {useState} from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number().required('Password is required')
  .min(4,'Password must be at least 4 characters')
  .max(20,'Password must be at most 20 characters'),
})

export default function App() {
  const [password,setPassword] = useState('')
  const [isPassGenerated,setIsPassGenerated] = useState(false)
  const [lowerCase,setLowerCase] = useState(false)
  const [upperCase,setUpperCase] = useState(false)
  const [numbers,setNumbers] = useState(false)
  const [symbols,setSymbols] = useState(false)

  const generatePasswordString = (passwordLength:number) =>{
  let characterList='';

  const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
  const digiChars = '0123456789'
  const specialChars = '!@#$%^&*()_+'

if (upperCase) {
  characterList+=upperCaseChars
}
if(lowerCase){
  characterList+=lowerCaseChars
}
if(numbers){
  characterList+=digiChars
}
if(symbols){
  characterList+=specialChars
}

const passwordResult= createPassword(characterList,passwordLength)
setPassword(passwordResult)
setIsPassGenerated(true)

  }

  const createPassword = (characters:string,passwordLength:number) =>{

    let result =  ''
    for (let i = 0; i < passwordLength; i++) {
    //  const characterIndex=Math.round(Math.random()*characters.length)
     const characterIndex = Math.floor(Math.random() *characters.length);
    result+=characters.charAt(characterIndex)
    }
    return result
  }

  // optimized code:
  // const characterIndex = Math.floor(Math.random() * charactersLength);

  const resetPasswordState = () =>{
    setPassword(``)
    setIsPassGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)

  }

  return (
   <ScrollView keyboardShouldPersistTaps="handled" style={styles.appContainer}>
    <SafeAreaView>
      <View style={styles.formContainer}>
        <Text style={styles.title}> 🔒   PassMaster  🔒</Text>
        <Text style={styles.description}>
        Welcome to PassMaster! This app creates secure and complex passwords using algorithms. Users can customize length and complexity. App prioritizes security and user-friendliness. </Text>
        <Formik
       initialValues={{ passwordLength: ''}}
       validationSchema={PasswordSchema}

       onSubmit={values=>{
        console.log(values);
        generatePasswordString(+values.passwordLength)
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset
         /* and other goodies */
       }) => (
        <>
        <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
             {touched.passwordLength && errors.passwordLength && (

              <Text style={styles.errorText}>{errors.passwordLength}</Text>
              )}

          </View>

          <TextInput
           style={styles.inputStyle}
           value={values.passwordLength}
           onChangeText={handleChange('passwordLength')}
            placeholder="Password Length"
            keyboardType='numeric'
           />
        </View>
        <View style={styles.inputWrapper}>

            <Text style={styles.heading}>Include Lowercase Characters</Text>
            <BouncyCheckbox
            disableBuiltInState
            size={20}
            fillColor="#5DA3FA"

            iconStyle={{ borderColor: "#5DA3FA" }}
            onPress={() => setLowerCase(!lowerCase)}
            isChecked={lowerCase}
          />


        </View>
        <View style={styles.inputWrapper}>

            <Text style={styles.heading}>Include Uppercase Characters</Text>
            <BouncyCheckbox
            disableBuiltInState
            size={20}
            fillColor="#5DA3FA"

            iconStyle={{ borderColor: "#5DA3FA" }}
            onPress={() => setUpperCase(!upperCase)}
            isChecked={upperCase}
          />


        </View>
        <View style={styles.inputWrapper}>

            <Text style={styles.heading}>Include Numbers</Text>
            <BouncyCheckbox
            disableBuiltInState
            size={20}
            fillColor="#5DA3FA"

            iconStyle={{ borderColor: "#5DA3FA" }}
            onPress={() => setNumbers(!numbers)}
            isChecked={numbers}
          />


        </View>
        <View style={styles.inputWrapper}>

            <Text style={styles.heading}>Include Symbols</Text>
            <BouncyCheckbox
            disableBuiltInState
            size={20}
            fillColor="#5DA3FA"

            iconStyle={{ borderColor: "#5DA3FA" }}
            onPress={() => setSymbols(!symbols)}
            isChecked={symbols}
          />


        </View>
        <View style={styles.inputWrapper}></View>
        <View style={styles.inputWrapper}></View>
        <View style={styles.inputWrapper}></View>

        <View style={styles.formActions}>
          <TouchableOpacity
          disabled={!isValid}
          style={styles.primaryBtn}
          onPress={handleSubmit}
          >
            <Text style={styles.primaryBtnTxt}>Generate a Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={()=>{
            handleReset();
            resetPasswordState();
          }}>
            <Text style={styles.secondaryBtnTxt}>Reset</Text>
          </TouchableOpacity>
        </View>
        </>
       )}
        </Formik>
        {isPassGenerated ? (

          <View style={[styles.card,styles.cardElevated]}>
            <Text style={styles.subTitle}>Here's your Password:</Text>
            <Text style={styles.description}>Long Press to Copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ): null}
       </View>
      </SafeAreaView>
   </ScrollView>

  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#031c45',
  },
  formContainer: {
    margin: 25,
    padding: 10,
  },
  title: {
    marginTop:20,
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 15,
    fontFamily: 'Roboto',
    color: '#fff',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
    color: '#fff',
  },
  description: {
    color: '#a3a3a3',
    marginBottom: 25,
    textAlign: 'center',
  },
  heading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#d1cfe3',
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#fff',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: -16,
  },
  primaryBtn: {
    width: 350,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: -3,
    backgroundColor: '#1a6aed',

  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 350,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: -3,
    marginTop: 10,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    color: '#031c45',
    fontWeight: '700',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
    borderColor: '#fff',
    width: '90%',
  },
  cardElevated: {
    marginTop: 30,
    backgroundColor: '#031c452',
    marginHorizontal:-3,
    // #031c45
    width: '102%',
    borderColor: '#fff',
    borderWidth: 1,
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontStyle: 'italic',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#fff'
  },
});