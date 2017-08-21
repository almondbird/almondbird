//
//  ConfigManager.h
//  SmartWebView
//
//  Created by Essam on 9/23/16.
//  Copyright © 2016 Essam. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ConfigManager : NSObject
@property (strong, nonatomic) NSURL *websiteURL;
@property (strong, nonatomic) NSString *appName;

+ (ConfigManager *)sharedInstance;
@end
