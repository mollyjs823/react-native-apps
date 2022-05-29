import { View, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../util/colors';

function Card({children}) {
    return (
        <View style={styles.container}>{children}</View>
    )
}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginTop: deviceWidth < 380 ? 18 : 36,
        marginHorizontal: 24,
        borderRadius: 8,
        backgroundColor: Colors.primary800,
        //Elevation for android, other shadows for iOS
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
})