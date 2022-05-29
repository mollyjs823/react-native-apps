import { View, Text, Pressable, StyleSheet } from 'react-native';
import Colors from '../../util/colors';

function PrimaryButton({ children, onPress }) {
    return (
        <View style={styles.outerContainer}>
            <Pressable 
                style={({ pressed }) => pressed 
                    ? 
                    [styles.container, styles.pressed] 
                    :
                    styles.container} 
                onPress={onPress}
                android_ripple={{color: Colors.primary600}}
            >
                <Text style={styles.text}>{children}</Text> 
            </Pressable>
        </View>
    );
};

export default PrimaryButton;

const styles = StyleSheet.create({
    outerContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',  
    },
    container: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
        backgroundColor: Colors.primary500,
    },
    text: {
        color: '#fff',
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.75,
    }
});