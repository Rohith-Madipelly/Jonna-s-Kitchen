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

export const scrollToSpecificLevel = (scrollViewRef,yAxis ) => {
    if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: yAxis, animated: true });
    }
};