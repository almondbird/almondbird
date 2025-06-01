//
//  DeeplinkingManager.h
//  SmartWebView
//
//  Created by Essam on 11/5/16.
//  Copyright © 2016 Essam. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DeeplinkingManager : NSObject
+ (DeeplinkingManager *)sharedInstance;
- (BOOL)handleURL:(NSURL*)url;
@end
