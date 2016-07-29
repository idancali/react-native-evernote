//
//  Evernote.m
//  Evernote
//

#import "Evernote.h"
#import "RCTLog.h"
#import "ENSDK.h"

@implementation Evernote

+ (BOOL) handleUrl:(NSURL *)url {
  return [[ENSession sharedSession] handleOpenURL:url];
}

+ (UIViewController*) lookupViewController: (UIViewController*) vc {
  
  if (vc.presentedViewController) {
    return [Evernote lookupViewController:vc.presentedViewController];
  }
  
  if ([vc isKindOfClass:[UISplitViewController class]]) {
    UISplitViewController* svc = (UISplitViewController*) vc;
    if (svc.viewControllers.count > 0) {
      return [Evernote lookupViewController:svc.viewControllers.lastObject];
    }
    return vc;
  }
  
  if ([vc isKindOfClass:[UINavigationController class]]) {
    UINavigationController* svc = (UINavigationController*) vc;
    if (svc.viewControllers.count > 0) {
      return [Evernote lookupViewController:svc.topViewController];
    }
    return vc;
  }
  
  if ([vc isKindOfClass:[UITabBarController class]]) {
    UITabBarController* svc = (UITabBarController*) vc;
    if (svc.viewControllers.count > 0) {
      return [Evernote lookupViewController:svc.selectedViewController];
    }
    return vc;
  }

  return vc;
}

+ (UIViewController*) currentViewController {
  UIViewController* vc = [UIApplication sharedApplication].keyWindow.rootViewController;
  return [Evernote lookupViewController:vc];
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setup:(NSString *)key secret:(NSString *)secret sandboxMode:(BOOL)sandboxMode) {
  [ENSession setSharedSessionConsumerKey:key consumerSecret:secret optionalHost:(sandboxMode ? ENSessionHostSandbox : nil)];
  RCTLogInfo(@"Evernote Is Now Setup");
}

RCT_EXPORT_METHOD(status:(RCTResponseSenderBlock)callback) {
  ENSession *session = [ENSession sharedSession];
  NSString* status = ([session isAuthenticated] ? @"authenticated" : @"not_authenticated");
  callback(@[status]);
}

RCT_EXPORT_METHOD(account:(RCTResponseSenderBlock)callback) {
  ENSession *session = [ENSession sharedSession];
  NSMutableDictionary* details = [NSMutableDictionary dictionary];
  [details setObject:[session userDisplayName] forKey:@"name"];
  callback(@[details]);
}

RCT_EXPORT_METHOD(login:(RCTResponseSenderBlock)callback) {
  ENSession *session = [ENSession sharedSession];
  [session authenticateWithViewController:[Evernote currentViewController] preferRegistration:NO completion:^(NSError *error) {
    if (error) {
      // An error occurred
      callback(@[@"login_failed", [error localizedDescription]]);
    } else {
      // The authentication was successful
      callback(@[@"login_successful"]); 
    }
  }];
}

RCT_EXPORT_METHOD(logout:(RCTResponseSenderBlock)callback) {
  ENSession *session = [ENSession sharedSession];
  [session unauthenticate];
  NSString* status = ([session isAuthenticated] ? @"logout_failed" : @"logout_successful");
  callback(@[status]);
}

@end
