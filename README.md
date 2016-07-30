# react-native-evernote
React Native Evernote Module for iOS & Android

# Quick Setup

Simply import the module and use whatever you need from within.

```javascript
import { EvernoteManager, EvernoteLogin } from 'react-native-evernote';
```

# Usage

To render the component just add it to your parent component. Make sure you set it up with the right Evernote API Key and Secret.

```javascript
render() {
  return (
    <View style={styles.container}>
      <EvernoteLogin apiKey={"<API KEY>"} secret={"<SECRET>"} isInSandboxMode={true} />
    </View>
  );
}
```

# License

Copyright (c) 2016 I. Dan Calinescu

 Licensed under the The MIT License (MIT) (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://raw.githubusercontent.com/idancali/react-native-evernote/master/LICENSE

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
