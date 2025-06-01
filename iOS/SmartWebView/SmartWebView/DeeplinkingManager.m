//
//  DeeplinkingManager.m
//  SmartWebView
//
//  Created by Essam on 11/5/16.
//  Copyright © 2016 Essam. All rights reserved.
//

#import <UIKit/UIKit.h>

#import "DeeplinkingManager.h"
#import "ConfigManager.h"
#import "WebViewController.h"

@implementation DeeplinkingManager

+ (DeeplinkingManager *)sharedInstance {
    static id sharedInstance = nil;
    static dispatch_once_t onceToken = 0;

    dispatch_once(&onceToken, ^{
        sharedInstance = [self new];
    });

    return sharedInstance;
}

- (BOOL)handleURL:(NSURL *)url {
    if ([url.host isEqualToString:@"open"]) {
        NSURLComponents *urlComponents = [NSURLComponents componentsWithURL:url resolvingAgainstBaseURL:NO];
        NSString *redirectionPath = [self valueForKey:@"path" fromQueryItems:urlComponents.queryItems];
        if (redirectionPath) {
            NSString *redirectionString = [[NSString stringWithFormat:@"%@://%@", [ConfigManager sharedInstance].websiteURL.scheme, [ConfigManager sharedInstance].websiteURL.host] stringByAppendingString:redirectionPath];
            NSURL *redirectionURL = [NSURL URLWithString:redirectionString];
            [self displayURL:redirectionURL];
            return YES;
        }
    }

    return NO;
}

- (NSString *)valueForKey:(NSString *)key fromQueryItems:(NSArray *)queryItems {
    NSPredicate *predicate = [NSPredicate predicateWithFormat:@"name=%@", key];
    NSURLQueryItem *queryItem = [[queryItems filteredArrayUsingPredicate:predicate] firstObject];
    return queryItem.value;
}

- (void)displayURL:(NSURL *)url {
    UIWindow *window = [UIApplication sharedApplication].windows.firstObject;
    WebViewController *webViewController = (WebViewController *)window.rootViewController;
    [webViewController changeURL:url];
}

@end
