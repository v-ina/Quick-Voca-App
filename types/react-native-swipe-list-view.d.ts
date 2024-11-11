// types/react-native-swipe-list-view.d.ts
declare module 'react-native-swipe-list-view' {
    import { Component } from 'react';
    import { ViewStyle } from 'react-native';
  
    interface SwipeRowProps {
      onRowPress?: () => void;
      disableRightSwipe?: boolean;
      rightOpenValue?: number;
      leftOpenValue?: number;
      stopLeftSwipe?: number;
      stopRightSwipe?: number;
      swipeToOpenPercent?: number;
      swipeToClosePercent?: number;
      renderHiddenItem?: (data: any, rowMap: any) => JSX.Element | null;
      style?: ViewStyle;
    }
  
    export class SwipeListView extends Component<{
      data: any[];
      renderItem: (data: any) => JSX.Element;
      renderHiddenItem?: (data: any, rowMap: any) => JSX.Element | null;
      keyExtractor?: (item: any, index: number) => string;
      onRowDidOpen?: (rowKey: string) => void;
      onRowClose?: (rowKey: string) => void;
      leftOpenValue?: number;
      rightOpenValue?: number;
      // 추가 props 정의
    }> {}
  
    export class SwipeRow extends Component<SwipeRowProps> {}
  
    export default { SwipeListView, SwipeRow };
  }
  