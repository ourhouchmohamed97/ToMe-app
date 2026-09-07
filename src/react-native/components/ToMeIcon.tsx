import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface ToMeIconProps {
  name: string;
  size?: number;
  color?: string;
  style?: TextStyle;
}

// Icon mappings to ensure high-fidelity appearance in React Native and Web
const ICON_MAP: Record<string, string> = {
  auto_awesome: 'auto_awesome',
  auto_stories: 'auto_stories',
  account_circle: 'account_circle',
  search: 'search',
  tune: 'tune',
  close: 'close',
  location_on: 'location_on',
  wb_twilight: 'wb_twilight',
  wb_sunny: 'wb_sunny',
  bedtime: 'bedtime',
  mic: 'mic',
  stop: 'stop',
  image: 'image',
  arrow_upward: 'arrow_upward',
  arrow_forward: 'arrow_forward',
  arrow_back: 'arrow_back',
  arrow_back_ios_new: 'arrow_back_ios_new',
  lock_clock: 'lock_clock',
  check_circle: 'check_circle',
  done_all: 'done_all',
  draw: 'draw',
  lock: 'lock',
  photo_camera: 'photo_camera',
  cloud_upload: 'cloud_upload',
  play_arrow: 'play_arrow',
  pause: 'pause',
  more_horiz: 'more_horiz',
  favorite: 'favorite',
  favorite_border: 'favorite_border',
  share: 'share',
  check: 'check',
  history_edu: 'history_edu',
  format_quote: 'format_quote',
  psychology_alt: 'psychology_alt',
  compass_calibration: 'compass_calibration',
  edit_note: 'edit_note',
  snooze: 'snooze',
  calendar_today: 'calendar_today',
  shield: 'shield',
  forum: 'forum',
  magic_button: 'magic_button',
  schedule: 'schedule',
  cyclone: 'cyclone',
  visibility_off: 'visibility_off',
  visibility: 'visibility',
  verified_user: 'verified_user',
  logout: 'logout',
  login: 'login',
  mail: 'mail',
  vpn_key: 'vpn_key',
  person: 'person',
  download: 'download',
  file_download: 'file_download',
  delete_forever: 'delete_forever',
  warning: 'warning',
  spa: 'spa',
  chevron_right: 'chevron_right',
};

export const ToMeIcon: React.FC<ToMeIconProps> = ({
  name,
  size = 20,
  color = '#4d4541',
  style,
}) => {
  const iconText = ICON_MAP[name] || name;

  return (
    <Text
      numberOfLines={1}
      allowFontScaling={false}
      style={[
        styles.icon,
        {
          fontSize: size,
          color,
          lineHeight: size,
        },
        style,
      ]}
    >
      {iconText}
    </Text>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'Material Symbols Outlined',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'center',
  },
});
