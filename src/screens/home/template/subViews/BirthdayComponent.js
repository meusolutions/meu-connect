import moment from 'moment';
import React from 'react';
import {Image, Platform, Text, View, TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';
import colors from '../../../../values/colors';
import {IMAGES} from '../../../../values/images';
import styles from '../../style';
import Swiper from 'react-native-swiper';
const BirthdayComponent = props => {
  const {
    birthdayOfUser,
    bdUserCurrentMonth,
    handleOpenDesBirthday,
    onCalendarChangeMonth,
  } = props;
  const today = moment(moment()).format('YYYY-MM-DD'); // Today

  return (
    <View style={[styles.viewContent, styles.baseShadow]}>
      <Image source={IMAGES.BgBirthdayHeader} style={styles.BgBirthday} />
      {birthdayOfUser && (
        <Swiper
          style={styles.BgBirthday}
          showsButtons={false}
          loop={true}
          autoplay
          index={0}>
          {birthdayOfUser &&
            birthdayOfUser.length > 0 &&
            birthdayOfUser.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    const day = {
                      day: new Date().getDate(),
                      month: new Date().getMonth() + 1,
                      year: new Date().getFullYear(),
                    };
                    handleOpenDesBirthday(day);
                    //console.log(day)
                  }}
                  key={item.id}
                  style={{marginTop: 10}}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: 'blue',
                      textAlign: 'center',
                    }}>
                    {`Hôm nay là sinh nhật ${item.first_name} ${item.middle_name} ${item.last_name} `}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: 'blue',
                      textAlign: 'center',
                    }}>
                    hãy gửi lời chúc mừng nào
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: 'center',
                    }}>
                    💖
                  </Text>
                </TouchableOpacity>
              );
            })}
        </Swiper>
      )}
      <Calendar
        style={styles.calendarHolder}
        current={today}
        markedDates={bdUserCurrentMonth}
        markingType="dot"
        onDayPress={day => {
          handleOpenDesBirthday(day);
        }}
        onMonthChange={month => onCalendarChangeMonth(month)}
        enableSwipeMonths={false}
        theme={{
          //day section
          textDayStyle: {textAlign: 'center'},
          textDayFontFamily: Platform.OS === 'ios' ? 'System' : 'OpenSans',
          todayTextColor: colors.white,
          todayDotColor: colors.purple_blue,
          todayBackgroundColor: colors.purple_blue,
          dayTextColor: colors.black,

          textDisabledColor: 'rgba(0, 0, 0, 0.25)',
          textDayFontWeight: '600',
          //month section
          textMonthFontSize: 18,
          textMonthFontFamily: Platform.OS === 'ios' ? 'System' : 'Montserrat',
          monthTextColor: colors.black,
          textMonthFontWeight: 'bold',
          //header section
          textDayHeaderFontSize: 16,
          textDayHeaderFontFamily:
            Platform.OS === 'ios' ? 'System' : 'OpenSans',
          textSectionTitleColor: 'rgba(0, 0, 0, 0.25)',
          textDayHeaderFontWeight: '300',
          //selected day section
          selectedDayBackgroundColor: colors.purple_blue,
          selectedDayTextColor: colors.white,
          //arrow section
          arrowColor: '#fa0000',

          //dot section
          selectedDotColor: colors.red,
        }}
      />
    </View>
  );
};

export default BirthdayComponent;
