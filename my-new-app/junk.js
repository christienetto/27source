
                        <View style={styles.inputContainer}>
                                <TextInput
                                        style={styles.input}
                                        placeholder="Add an item..."
                                        value={inputValue}
                                        onChangeText={setInputValue}
                                />
                                <Button title="Add" onPress={addItem} />
                        </View>

                        <FlatList
                                data={items}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                        <View style={styles.listItem}>
                                                <Text style={styles.itemText}>{item}</Text>
                                        </View>
                                )}
                        />
