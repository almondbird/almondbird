//
//  AssetsURLProtocol.m
//  SmartWebView
//
//  Created by Essam on 9/22/16.
//  Copyright © 2016 Essam. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AssetsURLProtocol.h"
#import "ConfigManager.h"

@implementation AssetsURLProtocol

+ (BOOL)canInitWithRequest:(NSURLRequest *)request {
    return [self canLoadLocalAssetForRequest:request] || [self shouldOpenRequestInBrowser:request];
}

+ (NSURLRequest*)canonicalRequestForRequest:(NSURLRequest*)request {
    return request;
}

- (void)startLoading {
    NSLog(@"START LOADING %@", self.request);

    if ([self.class shouldOpenRequestInBrowser:self.request]) {
        [[UIApplication sharedApplication] openURL:self.request.URL];
    } else {
        NSString *assetPath = [self.class localWebsiteAssetPathForRequest:self.request];
        NSData *data = [NSData dataWithContentsOfFile:assetPath];
        NSURLResponse *response = [[NSURLResponse alloc] initWithURL:self.request.URL
                                                            MIMEType:[self.class mimeTypeForExtension:self.request.URL.path.pathExtension]
                                               expectedContentLength:data.length
                                                    textEncodingName:nil];
        [[self client] URLProtocol:self didReceiveResponse:response cacheStoragePolicy:NSURLCacheStorageNotAllowed];
        [[self client] URLProtocol:self didLoadData:data];
        [[self client] URLProtocolDidFinishLoading:self];
    }
}

- (void)stopLoading {
    NSLog(@"STOP LOADING %@", self.request);
}

+ (BOOL)shouldOpenRequestInBrowser:(NSURLRequest *)request {
    return [request.URL.query containsString:@"almondbirdpopup=true"] && [[UIApplication sharedApplication] canOpenURL:request.URL];
}

+ (BOOL)canLoadLocalAssetForRequest:(NSURLRequest *)request {
    return [self mimeTypeForExtension:request.URL.path.pathExtension] && [self localWebsiteAssetPathForRequest:request];
}

+ (NSString *)localWebsiteAssetPathForRequest:(NSURLRequest *)request {
    return [[NSBundle mainBundle] pathForResource:[[@"Assets" stringByAppendingString:request.URL.path] stringByDeletingPathExtension] ofType:request.URL.path.pathExtension];
}

+ (NSString *)mimeTypeForExtension:(NSString *)extension {
    if ([@[@"png", @"jpg", @"jpeg", @"gif"] containsObject:extension]) {
        return [@"image/" stringByAppendingString:extension];
    } else if ([@[@"svg"] containsObject:extension]) {
        return [@"image/" stringByAppendingString:@"svg+xml"];
    } else if ([@[@"css"] containsObject:extension]) {
        return @"text/css";
    } else if ([@[@"js"] containsObject:extension]) {
        return @"text/javascript";
    } else if ([@[@"woff", @"woff2", @"ttf", @"eot", @"otf"] containsObject:extension]) {
        return @"font/opentype";
    } else if ([@[@"mp3"] containsObject:extension]) {
            return @"audio/mpeg";
    } else if ([@[@"wav"] containsObject:extension]) {
        return @"audio/vnd.wav";
    } else if ([@[@"pdf"] containsObject:extension]) {
        return @"application/pdf";
    } else {
        return nil;
    }
}

@end
