
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { listSkills, addSkill } from '../api/skill';
import { globalStyles } from '../../styles/globalStyles';
import { COLORS } from '../../constants/colors';

const SkillScreen = () => {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      const response = await listSkills();
      setSkills(response.skills);
    };
    fetchSkills();
  }, []);

  const handleAddSkill = async () => {
    await addSkill({ name, category, description });
    setName('');
    setCategory('');
    setDescription('');
    alert('Skill added!');
    // Refresh the list
    const response = await listSkills();
    setSkills(response.skills);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Skills</Text>
      <View style={globalStyles.card}>
        <TextInput
          style={globalStyles.input}
          placeholder="Skill Name"
          placeholderTextColor={COLORS.gray}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Category"
          placeholderTextColor={COLORS.gray}
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Description"
          placeholderTextColor={COLORS.gray}
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleAddSkill}>
          <Text style={globalStyles.buttonPrimaryText}>Add Skill</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={skills}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={[globalStyles.card, styles.skillCard]}>
            <Text style={styles.skillName}>{item.name}</Text>
            <Text style={styles.skillCategory}>{item.category}</Text>
            <Text style={globalStyles.text}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  skillCard: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  skillName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  skillCategory: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 5,
  },
});

export default SkillScreen;
