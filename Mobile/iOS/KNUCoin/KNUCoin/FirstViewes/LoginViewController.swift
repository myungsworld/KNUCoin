//
//  LoginContoller.swift
//  KNUCoin
//
//  Created by Sanghyun Byun on 2020/04/30.
//  Copyright © 2020 sbyun. All rights reserved.
//

import UIKit

class LoginViewController: UIViewController {
    
    @IBOutlet weak var userid_textField: UITextField!
    @IBOutlet weak var userpwd_textField: UITextField!
    
    enum Result {
        case success(HTTPURLResponse, Data)
        case failure(Error)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
//        let sessionConfig = URLSessionConfiguration.ephemeral
//        sessionConfig.httpCookieAcceptPolicy = .never
//        let customSession = URLSession(configuration: sessionConfig)
//
//        guard let url1 = URL(string: "https://www.google.com") else { return }
//        guard let url = URL(string: "http://192.168.0.29:3000/") else { return }
        
//        deleteCookies(forURL: url)
//
//        var cookies = readCookie(forURL: url)
//        print("Cookies before request: ", cookies)
//
//        executeURLRequest(url: url, inSession: customSession) { result in
//            if case let .success (response, data) = result {
//                guard let cookiesResponseHeader = response.allHeaderFields["Set-Cookie"] else { return }
//
//                cookies = self.readCookie(forURL: url)
//                print("Cookies after request: ", cookies)
//
//                let responseCookies = HTTPCookie.cookies(withResponseHeaderFields: response.allHeaderFields as! [String : String], for: url)
//                self.storeCookies(responseCookies, forURL: url)
//                cookies = self.readCookie(forURL: url)
//                print("Cookies After storing: ", cookies)
//            }
//        }
        
        
        
        

        guard let url = URL(string: "http://172.30.1.57:3000/check") else { return }
        
        
//        var request = URLRequest(url: url)
//        request.httpMethod = "GET"
//
//        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
//
//            if let e = error {
//                NSLog("An error has ooccured : \(e.localizedDescription)")
//                return
//            }
//
//            if let response = response as? HTTPURLResponse, let fields = response.allHeaderFields as? [String : String] {
//
//                let cookies = HTTPCookie.cookies(withResponseHeaderFields: fields, for: response.url!)
//                HTTPCookieStorage.shared.setCookies(cookies, for: response.url!, mainDocumentURL: nil)
//
//            }
        
        
//
//            if let data = data {
//                DispatchQueue.main.async {
//                    do {
//                        let object = try JSONSerialization.jsonObject(with: data, options: []) as? NSDictionary
//                        guard let result = object else { return }
//                        guard let rs = result["cookie"] as? String else { return }
//
//                        print(rs)
//
//                    } catch {
//                        print(error)
//                    }
//                }
//            }
//        }
//
//        task.resume()

        let cookie = self.readCookie(forURL: url)
        print(cookie)
        
    
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?){
          self.view.endEditing(true)
    }
    
    @IBAction func click_SignupText(_ sender: Any) {
        
        if let contoller = self.storyboard?.instantiateViewController(withIdentifier: "SignupView") {
            //move(push -> navi) controller
            self.navigationController?.pushViewController(contoller, animated: true)
        }
    }
    
    @IBAction func login_btn(_ sender: Any) {
        
        if let contoller = self.storyboard?.instantiateViewController(withIdentifier: "TabBar") {
            //move(push -> navi) controller
            self.navigationController?.pushViewController(contoller, animated: true)
        }
        /* Login Process */
//        if let id = userid_textField.text,
//            let pwd = userpwd_textField.text{
//
//            if(!id.isValid(String.ValidityType.id)){
//                let alert = UIAlertController(title: "아이디를 확인하세요", message: "아이디를 확인하세요", preferredStyle: UIAlertController.Style.alert)
//                let okAction = UIAlertAction(title: "Ok", style: .destructive)
//                alert.addAction(okAction)
//                self.present(alert, animated: true, completion: nil)
//
//                return
//            }
//
//            if(!pwd.isValid(String.ValidityType.password)){
//                let alert = UIAlertController(title: "비밀번호를 확인하세요", message: "비밀번호를 확인하세요", preferredStyle: UIAlertController.Style.alert)
//                let okAction = UIAlertAction(title: "Ok", style: .destructive)
//                alert.addAction(okAction)
//                self.present(alert, animated: true, completion: nil)
//
//                return
//            }
//
//            let params = ["user_id" : id,
//                              "pwd" : pwd]
//
//                guard let url = URL(string: "http://54.180.89.38/login") else { return }
//                var request = URLRequest(url: url)
//                request.httpMethod = "POST"
//                request.addValue("application/json", forHTTPHeaderField: "Content-Type")
//                request.addValue("application/json", forHTTPHeaderField: "Accept")
//
//                guard let httpBody = try? JSONSerialization.data(withJSONObject: params, options: []) else { return }
//
//                request.httpBody = httpBody
//
//                let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
//
//                    if let e = error {
//                        NSLog("An error has ooccured : \(e.localizedDescription)")
//                        return
//                    }
//
//                    if let data = data {
//                        DispatchQueue.main.async {
//                            do {
//                                let object = try JSONSerialization.jsonObject(with: data, options: []) as? NSDictionary
//                                guard let result = object else { return }
//                                guard let rs = result["result"] as? String else { return }
//
//                                if rs == "Success" {
//
//                                    let alert = UIAlertController(title: "성공", message: "로그인 완료!", preferredStyle: UIAlertController.Style.alert)
//
//                                    let okAction = UIAlertAction(title: "Ok", style: .default){ (action) in
//
//                                        if let contoller = self.storyboard?.instantiateViewController(withIdentifier: "TabBar") {
//                                            //move(push -> navi) controller
//                                            self.navigationController?.pushViewController(contoller, animated: true)
//                                        }
//                                    }
//
//                                    alert.addAction(okAction)
//                                    self.present(alert, animated: true, completion: nil)
//
//                                } else {
//
//                                    let alert = UIAlertController(title: "아이디 또는 비밀번호가 유효하지 않습니다", message: "아이디 또는 비밀번호가 유효하지 않습니다", preferredStyle: UIAlertController.Style.alert)
//                                    let okAction = UIAlertAction(title: "Ok", style: .destructive)
//                                    alert.addAction(okAction)
//                                    self.present(alert, animated: true, completion: nil)
//
//                                    return
//                                }
//
//                            } catch {
//                                print(error)
//                            }
//                        }
//                    }
//                }
//
//                task.resume()
//
//
//        } else {
//            //if there is no
//        }
    }
    
    //Read Cookies that are in Storage
    func readCookie(forURL url: URL) -> [HTTPCookie] {
        let cookieStorage = HTTPCookieStorage.shared
        let cookies = cookieStorage.cookies(for: url) ?? []
        return cookies
    }
    
    func executeURLRequest(url: URL, inSession session: URLSession = .shared, completion: @escaping (Result) -> Void) {
        
        let task = session.dataTask(with: url) { (data, response, error) in
            
            if let response = response as? HTTPURLResponse,
                let data = data {
                completion(.success(response, data))
                return
            }
            
            if let error = error {
                completion(.failure(error))
                return
            }
            
            let error = NSError(domain: "com.cookiesetting.test", code: 101, userInfo: [NSLocalizedDescriptionKey: "Unknown error occurred"])
            
            completion(.failure(error))
        }
        task.resume()
    }
    
    //Delete cookies that are in Storage
    func deleteCookies(forURL url: URL) {
        let cookieStorage = HTTPCookieStorage.shared
        
        for cookie in readCookie(forURL: url) {
            cookieStorage.deleteCookie(cookie)
        }
    }
    
    //Store cookies to Storage, it's not to generage cookie
    func storeCookies(_ cookies: [HTTPCookie], forURL url: URL) {
        let cookieStorage = HTTPCookieStorage.shared
        cookieStorage.setCookies(cookies, for: url, mainDocumentURL: nil)
    }
    
}
