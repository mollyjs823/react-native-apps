import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../util/colors';

function GameOverScreen({rounds, userNumber, onRestart}) {
    const {width, height} = useWindowDimensions();

    let imgSize = 300;

    if (width < 380) {
        imgSize = 150;
    }

    if (height < 400) {
        imgSize = 80;
    }

    const imgStyle = {
        width: imgSize,
        height: imgSize,
        borderRadius: imgSize / 2,
    };

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.rootContainer} >
                <Title>GAME OVER!</Title>
                <View style={[styles.imgContainer, imgStyle]}>
                    <Image source={require('../assets/images/success.png')} style={styles.img} />
                </View>
                <Text style={styles.summaryText}>
                    Your phone needed <Text style={styles.highlight}>{rounds} </Text> 
                    rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>
                </Text>
                <PrimaryButton onPress={onRestart}>Start New Game</PrimaryButton>
            </View>
        </ScrollView>
    );
};

export default GameOverScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer : {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgContainer: {
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 36,
    },
    img: {
        width: '100%',
        height: '100%',
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24,
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500,
    },
})