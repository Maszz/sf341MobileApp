import {FunctionComponent} from 'react';
import {
  View,
  Text,
  Box,
  HStack,
  Image,
  ZStack,
  Spacer,
  Center,
  TextArea,
  Divider,
  VStack,
  Button,
} from 'native-base';
import {StyleSheet, TouchableOpacity, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {border} from 'native-base/lib/typescript/theme/styled-system';
import {EventNameModal} from './createModal';
import {ProfileScreenProps} from '../types';
import {useGetSearchItemUserByUsernameMutation} from '../redux/apis';
import {useAuth} from '../hooks/useAuth';
import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {Config} from '../env';
const ProfileScreen: FunctionComponent<ProfileScreenProps> = ({
  navigation,
  route,
}) => {
  const {user} = useAuth();
  const [getData, {data, isSuccess}] = useGetSearchItemUserByUsernameMutation();
  const [isMounted, setIsMounted] = useState(false);
  const isFocused = useIsFocused();
  const [image, setImage] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<Array<string>>(['#FFEAE5', '#8C84D4']);

  const colorSet = {
    '#8C84D4': ['#C4C2F0', '#C9B8D9', '#ECC3D7', '#FDDDE0', '#FFEBE2'],
    '#8172F7': ['#7EB2E1', '#94D1E7', '#A28ACE', '#C291D2', '#E9AED0'],
    '#6BB79D': ['#7F8D4E', '#C9CDA7', '#CCCB93', '#E5D790', '#DDDFE5'],
    '#EF8B88': ['#E08437', '#E9A039', '#EBC046', '#EDD181', '#D7D9DE'],
    '#FFAECB': ['#E2D5F2', '#D1C7F1', '#CCE7F3', '#BCD8F2', '#ADC7F0'],
  } as any;
  useEffect(() => {
    if (!isMounted) {
      getData(user.username)
        .unwrap()
        .then(res => {
          if (res?.profile?.colors && res.profile?.colors !== null) {
            setColor([res.profile?.colors.c1, res.profile?.colors.c2]);
          }
        });
      setIsMounted(true);
    }
    if (isFocused) {
      getData(user.username)
        .unwrap()
        .then(res => {
          if (res?.profile?.colors && res.profile?.colors !== null) {
            setColor([res.profile?.colors.c1, res.profile?.colors.c2]);
          }
        });
    }
  }, [isFocused]);
  useEffect(() => {
    if (isSuccess) {
      console.log(data?.profile?.avarar);
      if (data?.profile?.avarar === null) {
        setImage(undefined);
      } else {
        setImage(Config.apiBaseUrl + data?.profile?.avarar);
      }

      // setImage(Config.apiBaseUrl + data?.profile?.avarar);
    }
  }, [isSuccess]);
  return (
    <View flex={10} backgroundColor={'white'} paddingX={5}>
      <Box flex={3} paddingY={5}>
        <ZStack flex={1}>
          <LinearGradient
            colors={color}
            useAngle={true}
            angle={0}
            angleCenter={{x: 0.5, y: 0.5}}
            style={{width: '100%', height: '90%', borderRadius: 20}}
          />
          <Box
            flex={1}
            flexDirection={'row'}
            marginTop={10}
            justifyContent={'space-between'}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                marginLeft={4}
                alt="key icon"
                source={require('../assets/back_icon.png')}
                tintColor={'white'}
              />
            </TouchableOpacity>
            <Spacer />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProfileSettingScreen');
              }}>
              <Image
                marginRight={7}
                alt="key icon"
                source={require('../assets/dot_icon.png')}
                style={{tintColor: 'white'}}
              />
            </TouchableOpacity>
          </Box>
        </ZStack>
      </Box>
      <Box flex={1.5} marginTop={'-30%'} opacity={1} flexDirection={'row'}>
        <Image
          borderColor={'#8172F7'}
          borderWidth={4}
          borderRadius={'full'}
          marginLeft={4}
          alt="key icon"
          // source={require('../assets/wonyoung_icon.png')}
          source={image ? {uri: image} : require('../assets/wonyoung_icon.png')}
          w={120}
          h={120}
          resizeMode={'cover'}
        />

        {/* <Image
          borderColor={'#8172F7'}
          borderWidth={4}
          borderRadius={'full'}
          marginLeft={4}
          alt="key icon"
          // source={require('../assets/wonyoung_icon.png')}
          source={{
            uri:
              'data:image/jpeg;base64,' +
              Buffer.from(data?.profile?.avarar?.data).toString('base64'), //data.data in your case
          }}
          style={{
            transform: [{rotate: '-90deg'}],
          }}
        /> */}
      </Box>
      <Box
        paddingTop={5}
        paddingX={5}
        flex={1}
        // backgroundColor={'blue.100'}
        flexDirection={'row'}
        justifyContent={'space-between'}>
        {/* 1 prop but 3 sata such as joied event follower followinf */}
        {/* each component has 2 similars prop are number(int) and name(string) */}
        {/* box 1 */}
        <Box>
          <Center>
            <Text fontSize={16} fontWeight={'normal'}>
              {data?.profile?.eventCount}
            </Text>
            <Text fontSize={16} fontWeight={'normal'}>
              Joined event
            </Text>
          </Center>
        </Box>
        {/* box 2 */}
        <Box>
          <Center>
            <Text fontSize={16} fontWeight={'normal'}>
              {data?._count.followedBy}
            </Text>
            <Text fontSize={16} fontWeight={'normal'}>
              Follower
            </Text>
          </Center>
        </Box>
        {/* box 3 */}
        <Box>
          <Center>
            <Text fontSize={16} fontWeight={'normal'}>
              {data?._count.following}
            </Text>
            <Text fontSize={16} fontWeight={'normal'}>
              Following
            </Text>
          </Center>
        </Box>
      </Box>
      <Box flex={2.1} marginX={5}>
        <Text fontSize={32} fontWeight={'bold'}>
          {data?.username}
        </Text>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text fontSize={14} fontWeight={'normal'} color={'#8B9093'}>
            {data?.profile?.displayName || 'no nickname set yet.'}
          </Text>
          {/* <Box flexDirection={'row'}>
            <Text fontSize={14} fontWeight={'normal'} color={'#8B9093'}>
              rating
            </Text>
            <Image
              marginLeft={5}
              alignSelf={'center'}
              alt="key icon"
              source={require('../assets/star_icon.png')}
            />
          </Box> */}
        </Box>
        <Divider my={2} opacity={0} />
        <Text
          textAlign={'justify'}
          fontSize={14}
          fontWeight={'normal'}
          numberOfLines={4}
          color={'#232259'}>
          {data?.profile?.bio || 'No bio'}
        </Text>
      </Box>
      <Box flex={1.2} paddingX={2} marginBottom={'30%'}>
        <Text fontSize={12} fontWeight={'normal'}>
          interested event
        </Text>
        <Divider my={2} opacity={0} />
        {/* tag loop */}
        <VStack flex={1}>
          <HStack flex={1} w={'100%'} flexWrap={'wrap'}>
            {data?.categories.map((interest: string, index: number) => {
              return (
                <Box
                  key={index}
                  borderRadius={'full'}
                  height={25}
                  minWidth={45}
                  mr={2}
                  justifyContent={'center'}
                  alignContent={'center'}
                  paddingX={2}
                  mb={2}
                  // get input color props
                  backgroundColor={colorSet[color[1]][index % 5]}>
                  <Text
                    textAlign={'center'}
                    fontSize={10}
                    fontWeight={'normal'}
                    tintColor={'bluegray.500'}
                    opacity={0.8}
                    //   get text tittle props
                  >
                    #{interest}
                  </Text>
                </Box>
              );
            })}
          </HStack>
          {/* <HStack flex={1}>
            <Box
              borderRadius={'full'}
              height={25}
              width={45}
              justifyContent={'center'}
              alignContent={'center'}
              // get input color props
              backgroundColor={'#99AAD4'}>
              <Text
                textAlign={'center'}
                fontSize={10}
                fontWeight={'normal'}
                tintColor={'bluegray.500'}
                opacity={0.8}
                //   get text tittle props
              >
                #cafe
              </Text>
            </Box>
          </HStack> */}
        </VStack>
      </Box>
      {/* <Box
        flex={1.2}
        // backgroundColor={'#F5F5F5'}
        justifyContent={'center'}
        alignContent={'center'}
        marginBottom={'10%'}>
        <HStack
          justifyContent={'space-between'}
          alignContent={'center'}
          marginX={'32%'}>
          {/* select new beautifull image icon */}
      {/* <Image
            backgroundColor={'blue.500'}
            borderRadius={'full'}
            width={30}
            height={30}
            alt="key icon"
            source={require('../assets/facebook_icon.png')}
          />
          <Image
            backgroundColor={'lightblue'}
            borderRadius={'full'}
            width={30}
            height={30}
            alt="key icon"
            source={require('../assets/twitter_icon.png')}
          />
          <Image
            backgroundColor={'salmon'}
            borderRadius={'full'}
            width={31}
            height={30}
            alt="key icon"
            tintColor={'white'}
            source={require('../assets/mail_icon.png')}
          />
        </HStack>
      </Box> */}
    </View>
  );
};
export default ProfileScreen;
