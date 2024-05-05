import { Box, Button, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const toast = useToast();

  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output);
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box w="50%">
      <Text mb={2} fontFamily="lg">
        Output
      </Text>

      <Button
        variant="outline"
        colorScheme="green"
        isLoading={isLoading}
        mb={4}
        onClick={() => runCode()}
      >
        Run Code
      </Button>

      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output ? output : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};

export default Output;
