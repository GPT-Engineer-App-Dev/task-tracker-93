// Complete the Index page component here
// Use chakra-ui
import { useState } from "react";
import { Box, Button, Input, List, ListItem, IconButton, Text, Flex, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const toast = useToast();

  const handleAddTodo = () => {
    if (input.trim() === "") {
      toast({
        title: "No input",
        description: "Please enter a todo item.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: input,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleCompleteTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <Box p={5}>
      <Flex mb={5}>
        <Input placeholder="Add a new todo..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAddTodo()} />
        <Button ml={2} onClick={handleAddTodo} leftIcon={<FaPlus />} colorScheme="blue">
          Add
        </Button>
      </Flex>
      <List spacing={3}>
        {todos.map((todo) => (
          <ListItem key={todo.id} p={2} bg={todo.isCompleted ? "green.100" : "gray.100"}>
            <Flex align="center" justify="space-between">
              <Text as={todo.isCompleted ? "s" : ""}>{todo.text}</Text>
              <Box>
                <IconButton icon={<FaCheck />} mr={2} onClick={() => handleCompleteTodo(todo.id)} aria-label="Complete todo" colorScheme="green" />
                <IconButton icon={<FaTrash />} onClick={() => handleDeleteTodo(todo.id)} aria-label="Delete todo" colorScheme="red" />
              </Box>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;
