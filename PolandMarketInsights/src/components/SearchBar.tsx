import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { searchCompanies } from "../store/slices/companiesSlice";
import { useAppDispatch } from "../store/hooks";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Szukaj firm, branż...",
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(searchCompanies({ term: searchTerm }));
      if (onSearch) {
        onSearch(searchTerm);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={searchTerm}
        onChangeText={setSearchTerm}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Szukaj</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0066cc",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SearchBar;
