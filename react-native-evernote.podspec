Pod::Spec.new do |s|
  s.name             = 'react-native-evernote'
  s.version          = '0.1.0'
  s.summary          = 'React Native Module for Evernote for iOS & Android'

  s.homepage         = 'https://github.com/idancali/react-native-evernote'
  s.license          = { :type => 'MIT', :file => 'LICENSE' }
  s.author           = { 'I. Dan Calinescu' => 'idancalinescu@gmail.com' }
  s.source           = { :git => 'https://github.com/idancali/react-native-evernote.git' }
  s.source_files     = 'ios/Evernote.{h,m}' 
  s.social_media_url = 'https://twitter.com/idancali'
  s.ios.deployment_target = '8.0'
  s.public_header_files = 'ios/Evernote.h'
  s.dependency 'evernote-cloud-sdk-ios', '~> 2.0.5'
  s.dependency 'React'
end
