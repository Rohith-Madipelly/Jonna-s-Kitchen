export const scrollToBottom = (scrollViewRef) => {
    if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
    }
}; 