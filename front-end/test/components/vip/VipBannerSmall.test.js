import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VipBannerSmall from '../../../src/components/vip/VipBannerSmall';

jest.mock('../../../src/components/vip/updateVipNow', () => () => <div>UpdateVipNow Component</div>);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        "vip.title": "VIP Title",
        "vip.description": "VIP Description",
        "vip.month": "month",
        "vip.better_puzzle": "Better Puzzle",
        "vip.better_puzzle_info": "Better Puzzle Info",
        "vip.powerful_ai": "Powerful AI",
        "vip.powerful_ai_info": "Powerful AI Info",
        "vip.special_tag": "Special Tag",
        "vip.special_tag_info": "Special Tag Info"
      };
      return translations[key];
    },
  }),
}));

jest.mock('../../../src/lib/number', () => ({
  formatNumber: (number) => number.toString(),
}));

test('renders VipBannerSmall component', () => {
  render(<VipBannerSmall />);

  // Kiểm tra tiêu đề hiển thị
  expect(screen.getByText('VIP Title')).toBeInTheDocument();
  expect(screen.getByText('VIP')).toBeInTheDocument();

  // Kiểm tra mô tả
  expect(screen.getByText('VIP Description')).toBeInTheDocument();

  // Kiểm tra giá hiển thị
  expect(screen.getByText('200000')).toBeInTheDocument();
  expect(screen.getByText('vnđ / month')).toBeInTheDocument();

  // Kiểm tra danh sách tính năng
  expect(screen.getByText('Better Puzzle')).toBeInTheDocument();
  expect(screen.getByText('Better Puzzle Info')).toBeInTheDocument();
  expect(screen.getByText('Powerful AI')).toBeInTheDocument();
  expect(screen.getByText('Powerful AI Info')).toBeInTheDocument();
  expect(screen.getByText('Special Tag')).toBeInTheDocument();
  expect(screen.getByText('Special Tag Info')).toBeInTheDocument();

  // Kiểm tra sự hiện diện của component UpdateVipNow
  expect(screen.getByText('UpdateVipNow Component')).toBeInTheDocument();
});
