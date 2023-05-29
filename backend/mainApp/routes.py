from controllers.example_controllers import search_bp, query_bp, login_bp, register_bp

def routes_list(app):
    app.register_blueprint(register_bp)
    app.register_blueprint(search_bp)
    app.register_blueprint(query_bp)
    app.register_blueprint(login_bp)
    return app