// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;


//recode v 1-------------------------------

import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import MicStream from 'react-native-microphone-stream';

// import { Audio } from 'expo-av';
// import { fetch } from "@tensorflow/tfjs-react-native";

export default function App() {
  const [recording, setRecording] = React.useState(false);
  await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  ]);
  
  async function startRecording() {
    setRecording(true)
    // console.log(recording)
    await MicStream.init({
      bufferSize: 4096,
      sampleRate: 16000 ,  //32000
      bitsPerChannel: 16,
      channelsPerFrame: 1,
    });
    const listener = MicStream.addListener(data => {
      console.log(data.length)
      console.log(typeof(data))
      console.log(typeof(data[0]))
      // console.log('hello')
      
      // audioCtx.decodeAudioData(audioData, function(buffer) {
      //   source.buffer = buffer;

      //   source.connect(audioCtx.destination);
      //   source.loop = true;
      // },

      // function(e){ console.log("Error with decoding audio data" + e.err); });
    });
    
    await MicStream.start();
    // try {
    //   console.log('Requesting permissions..');
    //   await Audio.requestPermissionsAsync();
    //   await Audio.setAudioModeAsync({
    //     allowsRecordingIOS: true,
    //     playsInSilentModeIOS: true,
    //   }); 
    //   console.log('Starting recording..');
    //   const recording = new Audio.Recording();
    //   await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    //   await recording.startAsync(); 
    //   setRecording(recording);
    //   console.log(recording)
    //   console.log('Recording started');
    // } catch (err) {
    //   console.error('Failed to start recording', err);
    // }
  }

  async function stopRecording() {
    setRecording(false)
    console.log(recording)
    await MicStream.stop();
    // await listener.remove();

    // console.log('Stopping recording..');
    // setRecording(undefined);
    // await recording.stopAndUnloadAsync();
    // console.log(recording)
    // const uri = recording.getURI(); 
    // console.log('Recording stopped and stored at', uri);
 
  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});


//recode v 1-------------------------------

