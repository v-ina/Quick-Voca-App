import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Button, Modal, View, StyleSheet } from 'react-native';

const DatePickerModal = ({ isVisible, onClose, onSelectDate }) => {
    const [date, setDate] = useState(new Date());

    const handleConfirm = () => {
        onSelectDate(date); // 선택한 날짜를 부모에게 전달
        onClose(); // 모달 닫기
    };

    // 날짜 변경 시 상태 업데이트
    const handleChangeDate = (event, selectedDate) => {
        if (event.type === 'set' && selectedDate) { // 'set' 타입일 경우에만 날짜를 설정
            setDate(selectedDate);
        } else {
            onClose(); // 사용자가 취소한 경우 모달 닫기
        }
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            style={styles.modal}
        >
            <View style={styles.modalContainer}>
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleChangeDate}
                />
                <Button title="확인" onPress={handleConfirm} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        height: 300,
        width: 300,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default DatePickerModal;
