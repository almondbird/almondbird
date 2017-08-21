//
//  ConfigManager.m
//  SmartWebView
//
//  Created by Essam on 9/23/16.
//  Copyright © 2016 Essam. All rights reserved.
//

#import "ConfigManager.h"

@interface ConfigManager()
@property (strong, nonatomic) NSDictionary *config;
@end

@implementation ConfigManager

+ (ConfigManager *)sharedInstance {
    static id sharedInstance = nil;
    static dispatch_once_t onceToken = 0;

    dispatch_once(&onceToken, ^{
        sharedInstance = [self new];
    });
    return sharedInstance;
}

-(instancetype)init {
    if (self = [super init]) {
        NSString *configString = [[NSString alloc] initWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"Assets/Config" ofType:@"json"] encoding:NSUTF8StringEncoding error:nil];
        self.config = [NSJSONSerialization JSONObjectWithData:[configString dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingAllowFragments error:nil];
    }

    return self;
}

- (NSURL *)websiteURL {
    return [NSURL URLWithString:self.config[@"websiteURL"]];
}

- (NSString *)appName {
    return self.config[@"appName"];
}

@end
