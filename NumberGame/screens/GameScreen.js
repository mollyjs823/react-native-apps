import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstrucText from '../components/ui/InstrucText';
import { Ionicons } from '@expo/vector-icons';
import GuessLog from '../components/ui/GuessLog';


function generateRandomBetween(min, max, exclude) {
    const randNum = Math.floor(Math.random() * (max - min)) + min;

    if (randNum == exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randNum;
    };
};

let minBound = 1;
let maxBound = 100;

function GameScreen({userNumber, onGameOver}) {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    const {width, height} = useWindowDimensions();

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
            minBound = 1;
            maxBound = 100;
        };
    }, [currentGuess, userNumber, onGameOver]);

    function nextGuessHandler(direction) {
        if (
            (direction === 'lower' && currentGuess < userNumber) || 
            (direction === 'higher' && currentGuess > userNumber)) {
                Alert.alert("Don't lie!", 'You know that this is wrong...', 
                            [{text: 'Sorry!', style: 'cancel'}]);
                return;
        };

        if (direction === 'lower') {
            maxBound = currentGuess;
        } else {
            minBound = currentGuess + 1;
        };

        const newRandNum = generateRandomBetween(minBound, maxBound, currentGuess);
        setCurrentGuess(newRandNum);
        setGuessRounds(prevGuessRounds => [newRandNum, ...prevGuessRounds]);
    };

    const guessRoundsListLength = guessRounds.length;

    let content = <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstrucText style={styles.instrucText}>Higher or lower?</InstrucText>
            <View style={styles.btnsContainer}>
                <View style={styles.btnContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}><Ionicons name='md-add' size={24} color='#fff' /></PrimaryButton>
                </View>
                <View style={styles.btnContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name='md-remove' size={24} color='#fff' /></PrimaryButton>
                </View>
            </View>
        </Card>
    </>

    if (width > 500) {
        content = <>
        <View style={styles.btnsContainerWide}>
            <View style={styles.btnContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}><Ionicons name='md-add' size={24} color='#fff' /></PrimaryButton>
            </View>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View style={styles.btnContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name='md-remove' size={24} color='#fff' /></PrimaryButton>
            </View>
        </View>
        </>
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {content}
            <View style={styles.listContainer}>
                <FlatList 
                    data={guessRounds} 
                    renderItem={(itemData) => 
                        <GuessLog 
                        roundNum={guessRoundsListLength - itemData.index} 
                        guess={itemData.item} 
                    />}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    );
};

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
    },
    btnsContainer: {
        flexDirection: 'row',
    },
    btnsContainerWide:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnContainer: {
        flex:1,
    },
    instrucText: {
        marginBottom: 12,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
})