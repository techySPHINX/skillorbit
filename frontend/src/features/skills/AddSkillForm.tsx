import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addSkill } from '../../store/skillSlice';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Modal } from '../../components/Modal';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin: 0;
`;

interface AddSkillFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddSkillForm: React.FC<AddSkillFormProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setError('Skill name is required');
      return;
    }

    try {
      await dispatch(addSkill({ name, category, description })).unwrap();
      onClose();
    } catch (err) {
      setError('Failed to add skill. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add a New Skill">
      <Form as={motion.form} onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Skill Name (e.g., Python, React)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Category (e.g., Programming, Design)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Textarea
          placeholder="Brief description of the skill..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit" variant="primary">
          Add Skill
        </Button>
      </Form>
    </Modal>
  );
};
