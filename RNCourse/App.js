import { 
  StyleSheet, 
  View, 
  FlatList,
  Button 
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";


export default function App() {

  const [courseGoals, setCourseGoals] = useState([]);
  const [modalVis, setModalVis] = useState(false);

  function startAddGoalHandler() {
    setModalVis(true);
  };

  function endAddGoalHandler() {
    setModalVis(false);
  };

  function addGoalHandler(enteredGoalText) {
      setCourseGoals((currentCourseGoals) => [
          ...currentCourseGoals, 
          { text: enteredGoalText, id: Math.random().toString() },
      ]);
      endAddGoalHandler();
  };

  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
    <StatusBar style="light"/>
    <View style={styles.container}>
      <Button 
        title="Add New Goal" 
        color="#b180f0"
        onPress={startAddGoalHandler} 
      />
      <GoalInput 
        visible={modalVis} 
        onAddGoal={addGoalHandler}
        onCancel={endAddGoalHandler}
      />
      <View style={styles.goalsContainer}>
        <FlatList 
          data={courseGoals} 
          renderItem={(itemData) => {
            return <GoalItem 
                      text={itemData.item.text} 
                      id={itemData.item.id}
                      onDeleteItem={deleteGoalHandler}
                    />;
          }} 
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
        {/* <ScrollView alwaysBounceVertical={false}>
          {courseGoals.map((goal) =>
          <View key={goal} style={styles.goalItem}>
            <Text style={styles.goalText}>{goal}</Text>
          </View>  
          )}
        </ScrollView> */}
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
