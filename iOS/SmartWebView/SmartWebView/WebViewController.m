//
//  ViewController.m
//  SmartWebView
//
//  Created by Essam on 9/22/16.
//  Copyright © 2016 Essam. All rights reserved.
//

#import "WebViewController.h"
#import "ConfigManager.h"

@interface WebViewController () <UIWebViewDelegate>
@property (weak, nonatomic) IBOutlet UIWebView *webView;
@end

@implementation WebViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    self.title = [ConfigManager sharedInstance].appName;
    [self.webView loadRequest:[NSURLRequest requestWithURL:[ConfigManager sharedInstance].websiteURL]];
}

- (void)changeURL:(NSURL *)url {
    [self.webView loadRequest:[NSURLRequest requestWithURL:url]];
}

@end
