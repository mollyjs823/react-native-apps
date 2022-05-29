import { Text, StyleSheet } from 'react-native';
import Colors from '../../util/colors';

function InstrucText({children, style}) {
    return (
        <Text style={[styles.instrucText, style]}>{children}</Text>
    );
};

export default InstrucText;

const styles = StyleSheet.create({
    instrucText: {
        fontFamily: 'open-sans',
        color: Colors.accent500,
        fontSize: 24,
    },
});