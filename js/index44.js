Notification.requestPermission(
    permission => alert (
        `Вы ${permission ? "разрешили" : "запретили"} показывать уведомления приложению ${location.host}`
    )
)
