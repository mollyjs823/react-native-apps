 import { StyleSheet, View, TextInput, Button, Modal, Image } from 'react-native';
 import { useState } from "react";

 function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState('');

    function goalInputHandler(enteredText) {
        setEnteredGoalText(enteredText);
    }
    function addGoalHandler() {
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText('');
    }

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Image source={require('../assets/images/goal.png')} style={styles.img} />
                <TextInput 
                    style={styles.textInput} 
                    placeholder="Your course goal!" 
                    onChangeText={goalInputHandler}
                    value={enteredGoalText}
                />
                <View style={styles.btnContainer}>
                    <View style={styles.btn}>
                        <Button title='Cancel' onPress={props.onCancel} color="#f31282"/>
                    </View>
                    <View style={styles.btn}>
                        <Button title="Add Goal" onPress={addGoalHandler} color="#b180f0" />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    inputContainer : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        padding: 16,
        paddingBottom: 12,
        backgroundColor: '#31136b',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e4d0ff',
        borderRadius: 6,
        backgroundColor: '#e4d0ff',
        color: '#120438',
        width: '100%',
        padding: 16,
    },
    btnContainer: {
        flexDirection: 'row',
        marginVertical: 16,
    },
    btn: {
        width: '30%',
        marginHorizontal: 8,
    },
    img: {
        width: 100,
        height: 100,
        margin: 20,
    },
});

export default GoalInput;