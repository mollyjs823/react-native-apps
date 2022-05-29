import { Text, StyleSheet, Platform } from 'react-native';

function Title({children}) {
    return (
        <Text style={styles.title}>{children}</Text>
    )
};

export default Title;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        color: '#FFF',
        textAlign: 'center',
        // borderWidth: Platform.OS === 'android' ? 2 : 0, ALSO WORKS
        borderWidth: Platform.select({ ios: 0, android: 2 }),
        borderColor: '#FFF',
        padding: 12,
        maxWidth: '80%',
    },
})