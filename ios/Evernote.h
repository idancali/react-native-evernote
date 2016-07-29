//
//  Evernote.h
//  Evernote
//

#import "RCTBridge.h"

@interface Evernote : NSObject <RCTBridgeModule>

+ (BOOL) handleUrl:(NSURL *)url;
+ (UIViewController*) currentViewController;
+ (UIViewController*) lookupViewController: (UIViewController*) vc;

@end
