import { 
    TextInput, 
    View, 
    StyleSheet, 
    Alert, 
    useWindowDimensions, 
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { useState } from 'react';
import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../util/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstrucText from '../components/ui/InstrucText';

function StartGameScreen(props) {
    const [enteredNum, setEnteredNum] = useState('');

    const {width, height} = useWindowDimensions();

    function numInputHandler(enteredText) {
        setEnteredNum(enteredText);
    };

    function confirmInputHandler() {
        const chosenNum = parseInt(enteredNum);
        
        if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
            Alert.alert(
                'Invalid Number', 
                'Number has to be a number between 1 and 99 (inclusive)',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            );
            return;
        }
        props.onConfirm(chosenNum);
    };

    function resetInputHandler() {
        setEnteredNum('');
    }

    let marginTopDistance = height < 380 ? 30 : 100;

    return (
        <ScrollView style={styles.screen}>
        <KeyboardAvoidingView style={styles.screen} behavior="position">
            <View style={[styles.rootContainer, {marginTop: marginTopDistance}]}>
                <Title>Guess My Number</Title>
                <Card>
                    <InstrucText>Enter a number:</InstrucText>
                    <TextInput 
                        style={styles.input} 
                        maxLength={2} 
                        keyboardType="number-pad"
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={enteredNum}
                        onChangeText={numInputHandler}
                    />
                    <View style={styles.btnsContainer}>
                        <View style={styles.btnContainer}>
                            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                        </View>
                        <View style={styles.btnContainer}>
                            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                        </View>
                    </View>
                </Card>
            </View>
        </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default StartGameScreen;


const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    btnsContainer: {
        flexDirection: 'row',
    },
    btnContainer: {
        flex: 1,
    },
});