export const scrollToBottom = (scrollViewRef) => {
    if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
    }
}; 

export const scrollToTop = (scrollViewRef) => {
    if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
};
